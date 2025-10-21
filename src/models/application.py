from datetime import datetime
from src.models.user import db

class Application(db.Model):
    __tablename__ = 'applications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    accelerator_name = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), default='draft')  # draft, submitted, accepted, rejected
    
    # Company Information
    company_name = db.Column(db.String(200))
    company_description = db.Column(db.Text)
    website = db.Column(db.String(500))
    stage = db.Column(db.String(100))
    
    # Founder Information
    founder_names = db.Column(db.Text)
    founder_emails = db.Column(db.Text)
    
    # Business Details
    industry = db.Column(db.String(200))
    target_market = db.Column(db.Text)
    revenue = db.Column(db.String(100))
    funding_raised = db.Column(db.String(100))
    
    # Application Content
    pitch = db.Column(db.Text)
    problem = db.Column(db.Text)
    solution = db.Column(db.Text)
    traction = db.Column(db.Text)
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    submitted_at = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'accelerator_name': self.accelerator_name,
            'status': self.status,
            'company_name': self.company_name,
            'company_description': self.company_description,
            'website': self.website,
            'stage': self.stage,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None
        }

class ContactForm(db.Model):
    __tablename__ = 'contact_forms'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    subject = db.Column(db.String(500))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Payment(db.Model):
    __tablename__ = 'payments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), default='USD')
    status = db.Column(db.String(50), default='pending')  # pending, completed, failed
    payment_method = db.Column(db.String(100))
    transaction_id = db.Column(db.String(500))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'amount': self.amount,
            'currency': self.currency,
            'status': self.status,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

