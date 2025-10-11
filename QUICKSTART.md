# Quick Start Guide

Get PlatFormula.One up and running in under 5 minutes!

## Prerequisites

Make sure you have:
- Node.js 18+ installed
- npm 9+ installed
- Git installed

Check versions:
```bash
node --version  # should be 18.x or higher
npm --version   # should be 9.x or higher
```

## 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/proclean808/PlatFormula-One.git
cd PlatFormula-One

# Install all dependencies
npm install
```

## 2. Environment Setup

```bash
# Copy environment files
cp .env.example .env
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env
```

**For quick development testing**, the apps will work with default settings. For full functionality, configure:

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
# Supabase (optional for testing)
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
# Database (optional for testing)
DATABASE_URL=postgresql://user:pass@localhost:5432/platformula
```

## 3. Start Development

```bash
# Start everything at once
npm run dev
```

Or start individually:

```bash
# Terminal 1 - Frontend
cd apps/frontend
npm run dev

# Terminal 2 - Backend
cd apps/backend
npm run dev
```

## 4. Access the Application

Open your browser:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

## 5. Explore Features

### User Features
- **Dashboard:** http://localhost:3000/dashboard
- **Application:** http://localhost:3000/application
- **Resources:** http://localhost:3000/resources
- **Readiness Score:** http://localhost:3000/readiness
- **Timeline:** http://localhost:3000/timeline
- **Forums:** http://localhost:3000/forums

### Admin Features
- **Admin Panel:** http://localhost:3000/admin

## 6. Test the API

```bash
# Health check
curl http://localhost:3001/health

# Get applications
curl http://localhost:3001/api/applications

# Get resources
curl http://localhost:3001/api/resources

# Get forum threads
curl http://localhost:3001/api/forums/threads

# Get analytics
curl http://localhost:3001/api/analytics/dashboard
```

## 7. Build for Production

```bash
# Build all packages
npm run build

# Build specific package
npm run build --workspace=apps/frontend
npm run build --workspace=apps/backend
```

## 8. Run Tests

```bash
# Run all tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

## Common Issues

### Port Already in Use

**Error:** Port 3000 or 3001 already in use

**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3002 npm run dev --workspace=apps/backend
```

### Module Not Found

**Error:** Cannot find module

**Solution:**
```bash
# Clean install
rm -rf node_modules apps/*/node_modules packages/*/node_modules
npm install
```

### Build Errors

**Error:** Build fails with TypeScript errors

**Solution:**
```bash
# Clear Next.js cache
rm -rf apps/frontend/.next

# Rebuild
npm run build --workspace=apps/frontend
```

## Docker Quick Start (Alternative)

If you have Docker installed:

```bash
# Start everything with Docker
docker-compose up

# Access at:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# Database: localhost:5432
```

## Next Steps

1. **Set up Supabase:**
   - Create account at https://supabase.com
   - Create new project
   - Run SQL from `database/schema.sql`
   - Update environment variables

2. **Explore the Code:**
   - Frontend: `apps/frontend/src/app/`
   - Backend: `apps/backend/src/`
   - Shared: `packages/shared/src/`

3. **Read Documentation:**
   - [README.md](README.md) - Full documentation
   - [FEATURES.md](FEATURES.md) - Feature details
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide

## Need Help?

- Check the [README](README.md) for detailed documentation
- Review [FEATURES.md](FEATURES.md) for feature explanations
- Open an issue on GitHub
- Contact the development team

## Development Tips

### Hot Reload
Changes to code automatically reload the application. No need to restart!

### Debugging
- Frontend: Use React DevTools browser extension
- Backend: Use `console.log()` or debugging tools

### Code Style
- ESLint catches common mistakes
- Prettier formats code automatically
- TypeScript provides type safety

### Making Changes
1. Create a feature branch
2. Make your changes
3. Run `npm run lint` and `npm run test`
4. Commit and push
5. Open a pull request

---

**You're all set!** 🚀

Happy coding with PlatFormula.One!
