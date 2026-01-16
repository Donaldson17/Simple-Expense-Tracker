# Vercel Deployment Instructions

## Quick Deploy

1. **Push to GitHub:**
```bash
git add .
git commit -m "Configure for Vercel"
git push origin main
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

## Important Notes

⚠️ **Database Issue**: Vercel doesn't support SQLite in production. You have 2 options:

### Option 1: Use PostgreSQL (Recommended)
1. Sign up for free PostgreSQL at https://neon.tech
2. Get your database URL
3. Add to Vercel environment variables:
   - `DATABASE_URL=postgresql://...`
4. Update requirements.txt: add `psycopg2-binary`

### Option 2: Deploy to Railway/Render Instead
These platforms support SQLite and Django better:
- Railway: https://railway.app
- Render: https://render.com

## Alternative: Deploy to PythonAnywhere (Easiest)

1. Sign up at https://www.pythonanywhere.com (free tier)
2. Upload your code
3. Configure web app with Django
4. Works perfectly with SQLite!

## Current Status
- ✅ Code is ready for deployment
- ⚠️ Needs database configuration for Vercel
- ✅ Works locally with `python manage.py runserver`
