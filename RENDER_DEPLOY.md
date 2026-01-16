# Deploy to Render.com - Step by Step

## Why Render?
- ✅ Free tier available
- ✅ Works perfectly with Django + SQLite
- ✅ Automatic deployments from GitHub
- ✅ Much easier than Vercel for Django

## Steps to Deploy:

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Sign Up on Render
- Go to https://render.com
- Sign up with your GitHub account (free)

### 3. Create New Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Connect your GitHub repository: `Simple-Expense-Tracker`
4. Click "Connect"

### 4. Configure the Service
Fill in these settings:

**Name:** `expense-tracker` (or any name you like)

**Environment:** `Python 3`

**Build Command:**
```
pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput
```

**Start Command:**
```
gunicorn expense_tracker.wsgi:application
```

**Instance Type:** `Free`

### 5. Add Environment Variables
Click "Advanced" and add:
- Key: `PYTHON_VERSION` Value: `3.9.0`
- Key: `SECRET_KEY` Value: `your-secret-key-here-change-this`

### 6. Deploy
- Click "Create Web Service"
- Wait 2-3 minutes for deployment
- Your app will be live at: `https://expense-tracker-xxxx.onrender.com`

## That's It! 🎉

Your expense tracker will be live and working!

## Troubleshooting
If you see errors, check the logs in Render dashboard.

## Alternative: Railway.app
Even simpler:
1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub"
4. Choose your repo
5. Done! (Railway auto-detects Django)
