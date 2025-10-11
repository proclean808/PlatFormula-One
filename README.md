# PlatFormula.One

**AI-Powered Startup Accelerator Program & Founders' Toolbox**

A comprehensive B2B SaaS platform designed to accelerate startups through structured programs, AI-powered insights, and community support.

## 🚀 Features

### Core Features
- **User Dashboard** - Track progress, view deadlines, and monitor overall program advancement
- **Application Builder** - Guided multi-step application process with automatic save functionality
- **Resource Directory** - Searchable library of startup resources (templates, guides, courses)
- **Readiness Scoring Engine** - AI-powered assessment with modular scoring across multiple categories
- **Program Timeline** - Interactive calendar with sync capabilities for Google Calendar/Outlook
- **Community Forums** - Discussion threads organized by topics with search and filtering
- **Admin Panel** - Complete management interface with RBAC, analytics, and user management

### Technical Features
- Monorepo architecture with Turborepo
- Full TypeScript coverage
- Responsive design with Tailwind CSS
- CI/CD pipeline with GitHub Actions
- PostgreSQL database with Supabase integration
- RESTful API backend

## 📁 Project Structure

```
PlatFormula-One/
├── apps/
│   ├── frontend/          # Next.js 14 application
│   │   ├── src/
│   │   │   ├── app/       # App router pages
│   │   │   │   ├── dashboard/
│   │   │   │   ├── application/
│   │   │   │   ├── resources/
│   │   │   │   ├── readiness/
│   │   │   │   ├── timeline/
│   │   │   │   ├── forums/
│   │   │   │   └── admin/
│   │   │   └── components/
│   │   └── package.json
│   └── backend/           # Node.js/Express API
│       ├── src/
│       │   ├── routes/
│       │   ├── controllers/
│       │   └── services/
│       └── package.json
├── packages/
│   └── shared/            # Shared types and utilities
│       └── src/
├── database/
│   └── schema.sql         # PostgreSQL schema
├── .github/
│   └── workflows/
│       └── ci.yml         # CI/CD pipeline
└── package.json
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Authentication**: Supabase Auth

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Supabase Client
- **Validation**: Zod

### Infrastructure
- **Monorepo**: Turborepo
- **Database**: PostgreSQL / Supabase
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (Frontend) / Railway (Backend)

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL database (or Supabase account)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/proclean808/PlatFormula-One.git
cd PlatFormula-One
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Copy the example environment files:
```bash
cp .env.example .env
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env
```

Update the `.env` files with your configuration:
- Supabase URL and keys
- Database connection string
- JWT secret

4. **Set up the database**

Run the database schema:
```bash
psql -h your-host -U your-user -d your-database -f database/schema.sql
```

Or if using Supabase, run the SQL in the Supabase SQL Editor.

5. **Start development servers**

```bash
# Start all services
npm run dev

# Or start individually
cd apps/frontend && npm run dev  # Frontend on http://localhost:3000
cd apps/backend && npm run dev   # Backend on http://localhost:3001
```

## 🚀 Available Scripts

### Root Level
- `npm run dev` - Start all development servers
- `npm run build` - Build all applications
- `npm run test` - Run all tests
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier

### Frontend
- `npm run dev` - Start Next.js dev server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm run start` - Start production server

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts with RBAC
- `applications` - Startup applications
- `resources` - Learning resources
- `forum_threads` - Discussion threads
- `forum_replies` - Thread replies
- `events` - Program timeline events
- `readiness_scores` - AI-powered assessment scores
- `analytics_events` - Platform analytics tracking

See `database/schema.sql` for complete schema.

## 🔐 Authentication & Authorization

The platform implements Role-Based Access Control (RBAC) with four user roles:
- **Founder** - Apply to programs, access resources, participate in forums
- **Mentor** - Guide founders, review applications
- **Reviewer** - Evaluate applications, provide feedback
- **Admin** - Full platform access, user management, analytics

## 🤖 AI Features

### Readiness Scoring Engine
The modular AI scoring engine evaluates startups across multiple dimensions:
- Business Model (20%)
- Market Validation (20%)
- Team Strength (15%)
- Financial Health (15%)
- Product Development (15%)
- Go-to-Market Strategy (15%)

Each category provides actionable recommendations for improvement.

## 📈 Analytics & Monitoring

The admin panel provides comprehensive analytics:
- User growth and engagement metrics
- Application conversion rates
- Program completion statistics
- Revenue tracking
- User satisfaction scores

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests for specific package
cd apps/frontend && npm run test
cd apps/backend && npm run test
```

## 🚢 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables
3. Configure build command: `npm run build`
4. Set start command: `npm run start`

### Database (Supabase)
1. Create a Supabase project
2. Run the schema from `database/schema.sql`
3. Update environment variables with Supabase credentials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👥 Team

Built with ❤️ by the PlatFormula.One team

## 📧 Support

For support, email support@platformula.one or join our community forums.

---

**PlatFormula.One** - Everything You Need to Succeed 🚀