# PlatFormula.One - Deployment Guide

## 🚀 Quick Deploy to Vercel

This repository contains the complete PlatFormula.One platform ready for deployment.

### Prerequisites
- Vercel account connected to this GitHub repository
- Supabase project (already connected)
- OpenAI API key
- Gmail App Password (optional, for email notifications)

---

## 📋 Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```bash
# OpenAI API Key (Required for AI features)
OPENAI_API_KEY=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

# Supabase Configuration (Get from Supabase Dashboard)
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Gmail Configuration (Optional)
GMAIL_EMAIL=alphabotsteam@gmail.com
GMAIL_APP_PASSWORD=Bn7548Jt!

# Email Settings
EMAIL_FORWARD_TO=contact@alphabots.team
PLATFORM_EMAIL=Jonathan@Behrendterprises.com

# Flask Secret Key
SECRET_KEY=asdf#FGSgvasgf$5$WGT
```

---

## 🗄️ Supabase Database Setup

### 1. Create Tables

Run this SQL in Supabase SQL Editor:

```sql
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
```

### 2. Enable Row Level Security (Optional but Recommended)

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Users can view their own applications
CREATE POLICY "Users can view own applications" ON applications
    FOR SELECT USING (auth.uid()::text = user_id::text);

-- Users can create applications
CREATE POLICY "Users can create applications" ON applications
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Users can update their own applications
CREATE POLICY "Users can update own applications" ON applications
    FOR UPDATE USING (auth.uid()::text = user_id::text);
```

---

## 🔧 Vercel Configuration

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/main.py",
      "use": "@vercel/python"
    },
    {
      "src": "src/static/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "src/main.py"
    },
    {
      "src": "/(.*)",
      "dest": "src/static/$1"
    }
  ]
}
```

---

## 📦 Project Structure

```
PlatFormula-One/
├── src/
│   ├── main.py              # Flask application
│   ├── models/              # Database models
│   │   ├── user.py
│   │   └── application.py
│   ├── routes/              # API routes
│   │   ├── auth.py
│   │   ├── applications.py
│   │   └── forms.py
│   ├── services/            # Services
│   │   ├── email.py
│   │   └── supabase_client.py
│   └── static/              # Frontend build
├── requirements.txt         # Python dependencies
├── .env.example            # Environment template
└── DEPLOYMENT.md           # This file
```

---

## 🚀 Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Deploy PlatFormula.One platform"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Import Project"
3. Select your GitHub repository: `proclean808/PlatFormula-One`
4. Configure:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: `src/static`
5. Add all environment variables from above
6. Click "Deploy"

### 3. Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## ✅ Post-Deployment Checklist

- [ ] Verify Supabase connection
- [ ] Test user registration
- [ ] Test login/logout
- [ ] Test AI features (pitch improvement, content generation)
- [ ] Test contact form
- [ ] Test email notifications
- [ ] Verify all 6 tabs work
- [ ] Test on mobile device
- [ ] Test dark mode

---

## 📊 API Endpoints

All endpoints are available at `/api/`:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update profile

### Applications
- `GET /api/applications` - List applications
- `POST /api/applications` - Create application
- `GET /api/applications/{id}` - Get application
- `PUT /api/applications/{id}` - Update application
- `POST /api/applications/{id}/submit` - Submit application

### AI Features
- `POST /api/ai/improve-pitch` - AI pitch improvement
- `POST /api/ai/generate-content` - AI content generation

### Forms
- `POST /api/contact` - Submit contact form
- `POST /api/waitlist` - Join waitlist

### Payments
- `POST /api/payments/create-intent` - Create payment
- `POST /api/payments/{id}/confirm` - Confirm payment

---

## 🔐 Security Notes

- All passwords are hashed with Werkzeug
- Session-based authentication
- CORS enabled for frontend
- Environment variables for sensitive data
- SQL injection protection via SQLAlchemy ORM

---

## 📧 Email Configuration

Emails are sent via Gmail SMTP. To enable:

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Set `GMAIL_APP_PASSWORD` environment variable

---

## 🆘 Troubleshooting

### Database Connection Issues
- Verify Supabase URL and keys in environment variables
- Check Supabase project is active
- Verify tables are created

### Email Not Sending
- Check Gmail App Password is correct
- Verify 2FA is enabled on Gmail account
- Check email_log.txt for logged emails

### AI Features Not Working
- Verify OpenAI API key is set
- Check API key has credits
- Review server logs for errors

---

## 📞 Support

- Email: Jonathan@Behrendterprises.com
- Platform: https://your-vercel-url.vercel.app

---

**Ready to launch! 🚀**

