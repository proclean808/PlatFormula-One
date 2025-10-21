"""
Supabase Integration for PlatFormula.One

This module provides a Supabase client for database operations.
Once Supabase credentials are provided, this will replace SQLite.
"""

import os
from typing import Optional, Dict, List, Any

# Supabase will be installed when credentials are provided
try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    SUPABASE_AVAILABLE = False
    print("[WARNING] Supabase library not installed. Using SQLite fallback.")

class SupabaseService:
    """Service for interacting with Supabase database"""
    
    def __init__(self):
        self.url = os.getenv('SUPABASE_URL')
        self.key = os.getenv('SUPABASE_KEY')
        self.service_key = os.getenv('SUPABASE_SERVICE_KEY')
        self.client: Optional[Client] = None
        
        if self.url and self.key and SUPABASE_AVAILABLE:
            try:
                self.client = create_client(self.url, self.key)
                print("[SUPABASE] Connected successfully")
            except Exception as e:
                print(f"[SUPABASE ERROR] Failed to connect: {str(e)}")
        else:
            print("[SUPABASE] Not configured - using SQLite")
    
    def is_available(self) -> bool:
        """Check if Supabase is configured and available"""
        return self.client is not None
    
    # User operations
    async def create_user(self, user_data: Dict[str, Any]) -> Optional[Dict]:
        """Create a new user in Supabase"""
        if not self.client:
            return None
        
        try:
            response = self.client.table('users').insert(user_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"[SUPABASE] Error creating user: {str(e)}")
            return None
    
    async def get_user_by_email(self, email: str) -> Optional[Dict]:
        """Get user by email"""
        if not self.client:
            return None
        
        try:
            response = self.client.table('users').select('*').eq('email', email).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"[SUPABASE] Error getting user: {str(e)}")
            return None
    
    async def update_user(self, user_id: int, user_data: Dict[str, Any]) -> Optional[Dict]:
        """Update user data"""
        if not self.client:
            return None
        
        try:
            response = self.client.table('users').update(user_data).eq('id', user_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"[SUPABASE] Error updating user: {str(e)}")
            return None
    
    # Application operations
    async def create_application(self, app_data: Dict[str, Any]) -> Optional[Dict]:
        """Create a new application"""
        if not self.client:
            return None
        
        try:
            response = self.client.table('applications').insert(app_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"[SUPABASE] Error creating application: {str(e)}")
            return None
    
    async def get_user_applications(self, user_id: int) -> List[Dict]:
        """Get all applications for a user"""
        if not self.client:
            return []
        
        try:
            response = self.client.table('applications').select('*').eq('user_id', user_id).execute()
            return response.data if response.data else []
        except Exception as e:
            print(f"[SUPABASE] Error getting applications: {str(e)}")
            return []
    
    async def update_application(self, app_id: int, app_data: Dict[str, Any]) -> Optional[Dict]:
        """Update application data"""
        if not self.client:
            return None
        
        try:
            response = self.client.table('applications').update(app_data).eq('id', app_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"[SUPABASE] Error updating application: {str(e)}")
            return None
    
    # Contact form operations
    async def create_contact_form(self, form_data: Dict[str, Any]) -> Optional[Dict]:
        """Create a contact form submission"""
        if not self.client:
            return None
        
        try:
            response = self.client.table('contact_forms').insert(form_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"[SUPABASE] Error creating contact form: {str(e)}")
            return None
    
    # Payment operations
    async def create_payment(self, payment_data: Dict[str, Any]) -> Optional[Dict]:
        """Create a payment record"""
        if not self.client:
            return None
        
        try:
            response = self.client.table('payments').insert(payment_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"[SUPABASE] Error creating payment: {str(e)}")
            return None
    
    async def update_payment(self, payment_id: int, payment_data: Dict[str, Any]) -> Optional[Dict]:
        """Update payment status"""
        if not self.client:
            return None
        
        try:
            response = self.client.table('payments').update(payment_data).eq('id', payment_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"[SUPABASE] Error updating payment: {str(e)}")
            return None

# Global Supabase service instance
supabase_service = SupabaseService()

# SQL Schema for Supabase (to be run when setting up)
SUPABASE_SCHEMA = """
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(200),
    company_name VARCHAR(200),
    role VARCHAR(100),
    subscription_tier VARCHAR(50) DEFAULT 'free',
    subscription_status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    accelerator_name VARCHAR(200) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft',
    company_name VARCHAR(200),
    company_description TEXT,
    website VARCHAR(500),
    stage VARCHAR(100),
    founder_names TEXT,
    founder_emails TEXT,
    industry VARCHAR(200),
    target_market TEXT,
    revenue VARCHAR(100),
    funding_raised VARCHAR(100),
    pitch TEXT,
    problem TEXT,
    solution TEXT,
    traction TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    submitted_at TIMESTAMP
);

-- Contact forms table
CREATE TABLE IF NOT EXISTS contact_forms (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(100),
    transaction_id VARCHAR(500),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
"""

