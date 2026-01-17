# 🚀 Deploy to Render (Better than Netlify for Django)

## Why Render > Netlify for Django:
- ✅ **Full Django support** (Netlify = static only)
- ✅ **Persistent database** (SQLite works!)
- ✅ **Always-on server** (not serverless)
- ✅ **Free tier** with 750 hours/month

## Quick Deploy Steps:

### 1. Push to GitHub (if not done)
```bash
git add .
git commit -m "Ready for Render"
git push origin main
```

### 2. Deploy on Render
1. Go to **[render.com](https://render.com)**
2. Click **"New Web Service"**
3. Connect your GitHub repo
4. Use these settings:
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
   - **Start Command**: `gunicorn expense_tracker.wsgi:application`
   - **Environment**: `Python 3`

### 3. Set Environment Variables
- `SECRET_KEY` = `your-secret-key`
- `DEBUG` = `False`
- `PYTHON_VERSION` = `3.11.0`

### 4. Deploy
Click **"Create Web Service"** - Done! 🎉

## Benefits over Vercel:
- ✅ **SQLite persists** (no data loss!)
- ✅ **Simpler setup**
- ✅ **Better for Django**
- ✅ **Free SSL**
- ✅ **Custom domains**

## Your app will be at:
`https://your-app-name.onrender.com`

## Alternative: Railway
Even simpler - just connect GitHub and deploy!
[railway.app](https://railway.app)