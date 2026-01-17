# 🚀 Deploy to Vercel via GitHub

## Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Create main branch
git branch -M main

# Add your GitHub repo (create one first on github.com)
git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git

# Push
git push -u origin main
```

## Step 2: Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub
2. Click **"Add New Project"**
3. Click **"Import"** next to your repository
4. Vercel auto-detects Django settings
5. Click **"Deploy"**

**That's it!** Your app deploys in ~2 minutes.

## Step 3: Set Environment Variables (Optional)

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add:
   - `SECRET_KEY` = `your-django-secret-key`
   - `DEBUG` = `False`
4. Click **Redeploy** from Deployments tab

## Auto-Deploy on Push

Every time you push to GitHub, Vercel automatically deploys:

```bash
git add .
git commit -m "Updated feature"
git push
```

Vercel builds and deploys automatically! 🎉

## ⚠️ Remember: SQLite Limitation

Your database resets on Vercel. For production, use PostgreSQL:
- [Neon.tech](https://neon.tech) - Free tier
- See `VERCEL_DEPLOY.md` for PostgreSQL setup

## Your Live URL

After deployment: `https://your-project.vercel.app`

Test it:
```bash
curl https://your-project.vercel.app/api/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test123"}'
```
