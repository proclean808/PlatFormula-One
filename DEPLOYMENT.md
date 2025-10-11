# Deployment Guide

This guide covers deploying PlatFormula.One to various platforms.

## Prerequisites

- GitHub repository
- Supabase account (for database)
- Vercel account (for frontend)
- Railway/Heroku account (for backend)

## Database Setup (Supabase)

1. Create a new Supabase project at https://supabase.com
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Execute the SQL to create tables and indexes
5. Copy your project URL and keys from Settings > API

## Frontend Deployment (Vercel)

1. **Connect Repository**
   - Visit https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select the `apps/frontend` directory as root

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `cd ../.. && npm install && npm run build --filter=@platformula/frontend`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables**
   Add the following environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_API_URL=your-backend-url/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Your frontend will be live at `your-project.vercel.app`

## Backend Deployment (Railway)

1. **Create New Project**
   - Visit https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure Service**
   - Root Directory: `apps/backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Watch Paths: `apps/backend/**`

3. **Environment Variables**
   Add these environment variables:
   ```
   NODE_ENV=production
   PORT=3001
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   DATABASE_URL=your-postgres-connection-string
   JWT_SECRET=your-secret-key
   CORS_ORIGIN=your-frontend-url
   ```

4. **Deploy**
   - Railway will automatically deploy
   - Note your backend URL (e.g., `your-app.railway.app`)

## Alternative: Backend on Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set buildpack: `heroku buildpacks:set heroku/nodejs`
5. Add environment variables: `heroku config:set KEY=VALUE`
6. Deploy: `git push heroku main`

## Post-Deployment Steps

1. **Update CORS**
   - Update backend CORS_ORIGIN with your frontend URL
   - Redeploy backend

2. **Update Frontend API URL**
   - Update NEXT_PUBLIC_API_URL in Vercel with your backend URL
   - Redeploy frontend

3. **Test All Features**
   - Registration/Login
   - Application submission
   - Resource access
   - Forum posting
   - Admin panel (if applicable)

4. **Set Up Monitoring**
   - Enable Vercel Analytics
   - Set up error tracking (e.g., Sentry)
   - Configure uptime monitoring

## Domain Configuration

### Frontend (Vercel)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

### Backend (Railway)
1. Go to Settings > Domains
2. Add custom domain
3. Update DNS with provided CNAME

## Environment-Specific Configurations

### Production
- Enable strict CORS
- Use production database
- Enable rate limiting
- Set secure JWT secret
- Enable HTTPS only

### Staging
- Use staging database
- Relaxed CORS for testing
- Enable debug logging

### Development
- Use local database
- Allow all CORS origins
- Verbose logging
- Hot reload enabled

## Troubleshooting

### Frontend Issues
- Check Vercel build logs
- Verify environment variables
- Test API connectivity
- Check browser console

### Backend Issues
- Check Railway/Heroku logs
- Verify database connection
- Test API endpoints with Postman
- Check CORS configuration

### Database Issues
- Verify Supabase connection
- Check Row Level Security policies
- Verify table permissions
- Check connection string

## Continuous Deployment

The project includes GitHub Actions CI/CD pipeline:
- Runs on push to `main` and `develop` branches
- Executes linting, tests, and builds
- Automatically deploys on successful builds

Configure deployment secrets in GitHub:
1. Go to Settings > Secrets and variables > Actions
2. Add required secrets for deployment

## Rollback Procedure

### Vercel
- Go to Deployments
- Find previous working deployment
- Click "Promote to Production"

### Railway
- Go to Deployments
- Select previous deployment
- Click "Redeploy"

## Monitoring & Logs

### Frontend
- Vercel Dashboard > Logs
- Browser DevTools Console
- Vercel Analytics

### Backend
- Railway Dashboard > Logs
- Application logs via `console.log`
- Error tracking service

### Database
- Supabase Dashboard > Database > Logs
- Query performance metrics
- Connection pool status

## Backup Strategy

1. **Database Backups**
   - Supabase provides automatic backups
   - Export data regularly via SQL
   - Store backups in secure location

2. **Code Backups**
   - Git repository is your primary backup
   - Tag releases: `git tag -a v1.0.0 -m "Release 1.0.0"`
   - Push tags: `git push origin --tags`

## Security Checklist

- [ ] Environment variables are secure and not committed
- [ ] JWT secret is strong and unique
- [ ] CORS is properly configured
- [ ] Database has Row Level Security enabled
- [ ] API endpoints have rate limiting
- [ ] HTTPS is enforced
- [ ] Authentication is required for sensitive operations
- [ ] Input validation is implemented
- [ ] SQL injection prevention is in place
- [ ] XSS protection is enabled

## Support

For deployment issues:
- Check documentation
- Review error logs
- Contact support team
- Open GitHub issue

---

**Remember**: Never commit secrets or credentials to the repository!
