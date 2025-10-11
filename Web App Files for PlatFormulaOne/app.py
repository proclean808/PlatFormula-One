from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import os
import openai
from datetime import datetime, timedelta
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'nexusyc-dev-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///nexusyc.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-string')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

# Set OpenAI API key
openai.api_key = os.environ.get('OPENAI_API_KEY')

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationship to profile
    profile = db.relationship('UserProfile', backref='user', uselist=False)

class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Basic info
    bio = db.Column(db.Text)
    location = db.Column(db.String(100))
    linkedin_url = db.Column(db.String(200))
    github_url = db.Column(db.String(200))
    
    # Startup info
    company_name = db.Column(db.String(100))
    company_stage = db.Column(db.String(50))  # idea, mvp, early_revenue, scaling
    industry = db.Column(db.String(100))
    looking_for = db.Column(db.String(50))  # cofounder, advisor, investor, partner
    
    # Skills and experience
    skills = db.Column(db.JSON)  # Array of skills
    experience_years = db.Column(db.Integer)
    previous_companies = db.Column(db.JSON)  # Array of company objects
    
    # Preferences
    work_style = db.Column(db.String(50))  # remote, hybrid, in_person
    commitment_level = db.Column(db.String(50))  # full_time, part_time, advisor
    equity_expectations = db.Column(db.String(50))
    
    # AI analysis results
    personality_score = db.Column(db.JSON)
    compatibility_factors = db.Column(db.JSON)
    
    # Privacy settings
    profile_visibility = db.Column(db.String(20), default='public')  # public, private, connections
    contact_preferences = db.Column(db.JSON)
    
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    compatibility_score = db.Column(db.Float)
    match_reasoning = db.Column(db.Text)
    ai_explanation = db.Column(db.Text)
    suggested_next_steps = db.Column(db.JSON)
    
    status = db.Column(db.String(20), default='pending')  # pending, viewed, contacted, connected, declined
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user1 = db.relationship('User', foreign_keys=[user1_id])
    user2 = db.relationship('User', foreign_keys=[user2_id])

class Connection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    message = db.Column(db.Text)
    status = db.Column(db.String(20), default='pending')  # pending, accepted, declined
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    responded_at = db.Column(db.DateTime)
    
    # Relationships
    requester = db.relationship('User', foreign_keys=[requester_id])
    recipient = db.relationship('User', foreign_keys=[recipient_id])

# AI Service Functions
def analyze_profile_with_ai(profile_data):
    """Use OpenAI to analyze user profile and extract insights"""
    try:
        prompt = f"""
        Analyze this startup founder profile and provide insights:
        
        Bio: {profile_data.get('bio', '')}
        Skills: {profile_data.get('skills', [])}
        Experience: {profile_data.get('experience_years', 0)} years
        Industry: {profile_data.get('industry', '')}
        Company Stage: {profile_data.get('company_stage', '')}
        Looking For: {profile_data.get('looking_for', '')}
        
        Provide a JSON response with:
        1. personality_traits (array of 5 key traits)
        2. strengths (array of 3 main strengths)
        3. ideal_cofounder_profile (description)
        4. compatibility_factors (array of factors important for matching)
        5. risk_factors (potential challenges)
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=1000
        )
        
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"AI analysis error: {e}")
        return {
            "personality_traits": ["analytical", "driven", "collaborative"],
            "strengths": ["technical expertise", "leadership", "vision"],
            "ideal_cofounder_profile": "Complementary skills and shared vision",
            "compatibility_factors": ["communication style", "work ethic", "goals alignment"],
            "risk_factors": ["time commitment", "equity expectations"]
        }

def calculate_compatibility_score(profile1, profile2):
    """Calculate compatibility score between two profiles using AI"""
    try:
        prompt = f"""
        Calculate compatibility score between these two startup founders:
        
        Founder 1:
        - Skills: {profile1.skills}
        - Industry: {profile1.industry}
        - Stage: {profile1.company_stage}
        - Looking for: {profile1.looking_for}
        - Work style: {profile1.work_style}
        - Experience: {profile1.experience_years} years
        
        Founder 2:
        - Skills: {profile2.skills}
        - Industry: {profile2.industry}
        - Stage: {profile2.company_stage}
        - Looking for: {profile2.looking_for}
        - Work style: {profile2.work_style}
        - Experience: {profile2.experience_years} years
        
        Provide a JSON response with:
        1. compatibility_score (0-100)
        2. reasoning (detailed explanation)
        3. strengths (what works well together)
        4. challenges (potential issues)
        5. next_steps (recommended actions)
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=800
        )
        
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"Compatibility calculation error: {e}")
        return {
            "compatibility_score": 75,
            "reasoning": "Good complementary skills and shared industry focus",
            "strengths": ["Complementary expertise", "Similar stage"],
            "challenges": ["Different work styles"],
            "next_steps": ["Schedule intro call", "Share pitch decks"]
        }

# API Routes

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    user = User(
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        first_name=data.get('first_name', ''),
        last_name=data.get('last_name', '')
    )
    
    db.session.add(user)
    db.session.commit()
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        }
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/profile', methods=['GET', 'POST'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    
    if request.method == 'GET':
        profile = UserProfile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({'error': 'Profile not found'}), 404
        
        return jsonify({
            'bio': profile.bio,
            'location': profile.location,
            'linkedin_url': profile.linkedin_url,
            'github_url': profile.github_url,
            'company_name': profile.company_name,
            'company_stage': profile.company_stage,
            'industry': profile.industry,
            'looking_for': profile.looking_for,
            'skills': profile.skills,
            'experience_years': profile.experience_years,
            'work_style': profile.work_style,
            'commitment_level': profile.commitment_level,
            'personality_score': profile.personality_score
        })
    
    elif request.method == 'POST':
        data = request.get_json()
        profile = UserProfile.query.filter_by(user_id=user_id).first()
        
        if not profile:
            profile = UserProfile(user_id=user_id)
        
        # Update profile fields
        profile.bio = data.get('bio', profile.bio)
        profile.location = data.get('location', profile.location)
        profile.linkedin_url = data.get('linkedin_url', profile.linkedin_url)
        profile.github_url = data.get('github_url', profile.github_url)
        profile.company_name = data.get('company_name', profile.company_name)
        profile.company_stage = data.get('company_stage', profile.company_stage)
        profile.industry = data.get('industry', profile.industry)
        profile.looking_for = data.get('looking_for', profile.looking_for)
        profile.skills = data.get('skills', profile.skills)
        profile.experience_years = data.get('experience_years', profile.experience_years)
        profile.work_style = data.get('work_style', profile.work_style)
        profile.commitment_level = data.get('commitment_level', profile.commitment_level)
        
        # Run AI analysis on profile
        ai_analysis = analyze_profile_with_ai(data)
        profile.personality_score = ai_analysis
        
        db.session.add(profile)
        db.session.commit()
        
        return jsonify({'message': 'Profile updated successfully', 'ai_analysis': ai_analysis})

@app.route('/api/matches', methods=['GET'])
@jwt_required()
def get_matches():
    user_id = get_jwt_identity()
    
    # Get user's profile
    user_profile = UserProfile.query.filter_by(user_id=user_id).first()
    if not user_profile:
        return jsonify({'error': 'Please complete your profile first'}), 400
    
    # Find potential matches based on criteria
    potential_matches = UserProfile.query.filter(
        UserProfile.user_id != user_id,
        UserProfile.profile_visibility == 'public'
    ).all()
    
    matches = []
    for match_profile in potential_matches[:10]:  # Limit to 10 matches
        # Calculate compatibility
        compatibility_data = calculate_compatibility_score(user_profile, match_profile)
        
        # Create or update match record
        existing_match = Match.query.filter(
            ((Match.user1_id == user_id) & (Match.user2_id == match_profile.user_id)) |
            ((Match.user1_id == match_profile.user_id) & (Match.user2_id == user_id))
        ).first()
        
        if not existing_match:
            match = Match(
                user1_id=user_id,
                user2_id=match_profile.user_id,
                compatibility_score=compatibility_data['compatibility_score'],
                match_reasoning=compatibility_data['reasoning'],
                ai_explanation=compatibility_data['reasoning'],
                suggested_next_steps=compatibility_data['next_steps']
            )
            db.session.add(match)
        
        matches.append({
            'user_id': match_profile.user_id,
            'name': f"{match_profile.user.first_name} {match_profile.user.last_name}",
            'company_name': match_profile.company_name,
            'industry': match_profile.industry,
            'company_stage': match_profile.company_stage,
            'location': match_profile.location,
            'skills': match_profile.skills,
            'bio': match_profile.bio,
            'compatibility_score': compatibility_data['compatibility_score'],
            'reasoning': compatibility_data['reasoning'],
            'strengths': compatibility_data['strengths'],
            'challenges': compatibility_data['challenges'],
            'next_steps': compatibility_data['next_steps']
        })
    
    db.session.commit()
    
    # Sort by compatibility score
    matches.sort(key=lambda x: x['compatibility_score'], reverse=True)
    
    return jsonify({'matches': matches})

@app.route('/api/connect', methods=['POST'])
@jwt_required()
def send_connection_request():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    recipient_id = data['recipient_id']
    message = data.get('message', '')
    
    # Check if connection already exists
    existing_connection = Connection.query.filter(
        ((Connection.requester_id == user_id) & (Connection.recipient_id == recipient_id)) |
        ((Connection.requester_id == recipient_id) & (Connection.recipient_id == user_id))
    ).first()
    
    if existing_connection:
        return jsonify({'error': 'Connection already exists'}), 400
    
    connection = Connection(
        requester_id=user_id,
        recipient_id=recipient_id,
        message=message
    )
    
    db.session.add(connection)
    db.session.commit()
    
    return jsonify({'message': 'Connection request sent successfully'})

@app.route('/api/connections', methods=['GET'])
@jwt_required()
def get_connections():
    user_id = get_jwt_identity()
    
    # Get incoming requests
    incoming = Connection.query.filter_by(recipient_id=user_id, status='pending').all()
    
    # Get outgoing requests
    outgoing = Connection.query.filter_by(requester_id=user_id).all()
    
    # Get accepted connections
    accepted = Connection.query.filter(
        ((Connection.requester_id == user_id) | (Connection.recipient_id == user_id)) &
        (Connection.status == 'accepted')
    ).all()
    
    return jsonify({
        'incoming': [{'id': c.id, 'requester': c.requester.first_name + ' ' + c.requester.last_name, 
                     'message': c.message, 'created_at': c.created_at.isoformat()} for c in incoming],
        'outgoing': [{'id': c.id, 'recipient': c.recipient.first_name + ' ' + c.recipient.last_name,
                     'status': c.status, 'created_at': c.created_at.isoformat()} for c in outgoing],
        'accepted': [{'id': c.id, 'name': (c.requester.first_name + ' ' + c.requester.last_name) if c.recipient_id == user_id 
                     else (c.recipient.first_name + ' ' + c.recipient.last_name)} for c in accepted]
    })

@app.route('/api/connections/<int:connection_id>/respond', methods=['POST'])
@jwt_required()
def respond_to_connection(connection_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    connection = Connection.query.filter_by(id=connection_id, recipient_id=user_id).first()
    if not connection:
        return jsonify({'error': 'Connection not found'}), 404
    
    connection.status = data['status']  # 'accepted' or 'declined'
    connection.responded_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({'message': f'Connection {data["status"]} successfully'})

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0',
        'service': 'NexusYC Backend'
    })

# Initialize database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
