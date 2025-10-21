from flask import Blueprint, request, jsonify, session
from src.models.user import db
from src.models.application import Application
from datetime import datetime
from openai import OpenAI
import os

app_bp = Blueprint('applications', __name__)

# Initialize OpenAI client
client = OpenAI()

@app_bp.route('/applications', methods=['GET'])
def get_applications():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    applications = Application.query.filter_by(user_id=session['user_id']).all()
    return jsonify({'applications': [app.to_dict() for app in applications]}), 200

@app_bp.route('/applications', methods=['POST'])
def create_application():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        data = request.get_json()
        
        application = Application(
            user_id=session['user_id'],
            accelerator_name=data.get('accelerator_name', ''),
            company_name=data.get('company_name', ''),
            company_description=data.get('company_description', ''),
            website=data.get('website', ''),
            stage=data.get('stage', ''),
            founder_names=data.get('founder_names', ''),
            founder_emails=data.get('founder_emails', ''),
            industry=data.get('industry', ''),
            target_market=data.get('target_market', ''),
            revenue=data.get('revenue', ''),
            funding_raised=data.get('funding_raised', ''),
            pitch=data.get('pitch', ''),
            problem=data.get('problem', ''),
            solution=data.get('solution', ''),
            traction=data.get('traction', ''),
            status='draft'
        )
        
        db.session.add(application)
        db.session.commit()
        
        return jsonify({
            'message': 'Application created successfully',
            'application': application.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app_bp.route('/applications/<int:app_id>', methods=['GET'])
def get_application(app_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    application = Application.query.filter_by(id=app_id, user_id=session['user_id']).first()
    if not application:
        return jsonify({'error': 'Application not found'}), 404
    
    return jsonify({'application': application.to_dict()}), 200

@app_bp.route('/applications/<int:app_id>', methods=['PUT'])
def update_application(app_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        application = Application.query.filter_by(id=app_id, user_id=session['user_id']).first()
        if not application:
            return jsonify({'error': 'Application not found'}), 404
        
        data = request.get_json()
        
        # Update fields
        for field in ['accelerator_name', 'company_name', 'company_description', 'website', 
                      'stage', 'founder_names', 'founder_emails', 'industry', 'target_market',
                      'revenue', 'funding_raised', 'pitch', 'problem', 'solution', 'traction']:
            if field in data:
                setattr(application, field, data[field])
        
        application.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Application updated successfully',
            'application': application.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app_bp.route('/applications/<int:app_id>/submit', methods=['POST'])
def submit_application(app_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        application = Application.query.filter_by(id=app_id, user_id=session['user_id']).first()
        if not application:
            return jsonify({'error': 'Application not found'}), 404
        
        application.status = 'submitted'
        application.submitted_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Application submitted successfully',
            'application': application.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app_bp.route('/ai/improve-pitch', methods=['POST'])
def improve_pitch():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        data = request.get_json()
        pitch = data.get('pitch', '')
        
        if not pitch:
            return jsonify({'error': 'Pitch text is required'}), 400
        
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "You are an expert startup advisor helping founders improve their accelerator application pitches. Provide specific, actionable feedback and an improved version."},
                {"role": "user", "content": f"Please improve this startup pitch for an accelerator application:\n\n{pitch}"}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        improved_pitch = response.choices[0].message.content
        
        return jsonify({
            'original': pitch,
            'improved': improved_pitch
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app_bp.route('/ai/generate-content', methods=['POST'])
def generate_content():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        data = request.get_json()
        section = data.get('section', '')  # problem, solution, traction, etc.
        context = data.get('context', '')
        
        if not section or not context:
            return jsonify({'error': 'Section and context are required'}), 400
        
        prompts = {
            'problem': "Generate a compelling problem statement for an accelerator application based on this context:",
            'solution': "Generate a clear and innovative solution description for an accelerator application based on this context:",
            'traction': "Generate a strong traction/metrics section for an accelerator application based on this context:",
            'pitch': "Generate a compelling elevator pitch for an accelerator application based on this context:"
        }
        
        prompt = prompts.get(section, "Generate content for an accelerator application based on this context:")
        
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "You are an expert startup advisor helping founders write compelling accelerator applications."},
                {"role": "user", "content": f"{prompt}\n\n{context}"}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        generated_content = response.choices[0].message.content
        
        return jsonify({
            'section': section,
            'content': generated_content
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

