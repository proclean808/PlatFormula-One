from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.application import ContactForm, Payment
from src.services.email import email_service

forms_bp = Blueprint('forms', __name__)

@forms_bp.route('/contact', methods=['POST'])
def submit_contact_form():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('name') or not data.get('email') or not data.get('message'):
            return jsonify({'error': 'Name, email, and message are required'}), 400
        
        # Create contact form entry
        contact = ContactForm(
            name=data['name'],
            email=data['email'],
            subject=data.get('subject', 'General Inquiry'),
            message=data['message']
        )
        
        db.session.add(contact)
        db.session.commit()
        
        # Send notification email to admin
        admin_email = 'Jonathan@Behrendterprises.com'
        email_service.send_contact_form_notification(
            admin_email,
            data['name'],
            data['email'],
            data.get('subject', 'General Inquiry'),
            data['message']
        )
        
        return jsonify({
            'message': 'Contact form submitted successfully',
            'id': contact.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@forms_bp.route('/waitlist', methods=['POST'])
def join_waitlist():
    try:
        data = request.get_json()
        
        if not data.get('email'):
            return jsonify({'error': 'Email is required'}), 400
        
        # Create contact form entry for waitlist
        contact = ContactForm(
            name=data.get('name', 'Waitlist User'),
            email=data['email'],
            subject='Waitlist Signup',
            message=f"Joined waitlist. Company: {data.get('company', 'N/A')}"
        )
        
        db.session.add(contact)
        db.session.commit()
        
        # Send welcome email
        email_service.send_email(
            data['email'],
            'Welcome to PlatFormula.One Waitlist!',
            f"""
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <h1 style="color: #10b981;">You're on the list!</h1>
                    <p>Thank you for joining the PlatFormula.One waitlist.</p>
                    <p>We'll notify you as soon as we launch!</p>
                    <p>Best regards,<br>The PlatFormula.One Team</p>
                </body>
            </html>
            """,
            "Thank you for joining the PlatFormula.One waitlist!"
        )
        
        return jsonify({
            'message': 'Successfully joined waitlist',
            'id': contact.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@forms_bp.route('/payments/create-intent', methods=['POST'])
def create_payment_intent():
    """Create a payment intent for Stripe"""
    try:
        data = request.get_json()
        
        # This would integrate with Stripe
        # For now, create a payment record
        from flask import session
        if 'user_id' not in session:
            return jsonify({'error': 'Not authenticated'}), 401
        
        payment = Payment(
            user_id=session['user_id'],
            amount=data.get('amount', 0),
            currency=data.get('currency', 'USD'),
            description=data.get('description', 'Platform subscription'),
            status='pending'
        )
        
        db.session.add(payment)
        db.session.commit()
        
        return jsonify({
            'payment_id': payment.id,
            'client_secret': 'placeholder_for_stripe_integration',
            'message': 'Payment intent created'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@forms_bp.route('/payments/<int:payment_id>/confirm', methods=['POST'])
def confirm_payment(payment_id):
    """Confirm a payment"""
    try:
        from flask import session
        if 'user_id' not in session:
            return jsonify({'error': 'Not authenticated'}), 401
        
        payment = Payment.query.filter_by(id=payment_id, user_id=session['user_id']).first()
        if not payment:
            return jsonify({'error': 'Payment not found'}), 404
        
        payment.status = 'completed'
        payment.transaction_id = request.get_json().get('transaction_id', '')
        db.session.commit()
        
        return jsonify({
            'message': 'Payment confirmed',
            'payment': payment.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

