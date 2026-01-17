# Vercel Deployment Guide

## ⚠️ Important Limitations

**Vercel + Django + SQLite has critical limitations:**
- SQLite database is stored in `/tmp` (ephemeral storage)
- **Data will be lost** on each deployment or serverless function restart
- For production, use PostgreSQL (Neon, Supabase) or MySQL

## Quick Deploy Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **simple-expense-tracker** (or your choice)
- Directory? **./** (press Enter)
- Override settings? **N**

### 4. Set Environment Variables (Optional)
```bash
vercel env add SECRET_KEY
```
Enter a secure secret key when prompted.

### 5. Deploy to Production
```bash
vercel --prod
```

## Environment Variables to Set

In Vercel Dashboard (Settings → Environment Variables):

| Variable | Value | Description |
|----------|-------|-------------|
| `SECRET_KEY` | `your-secret-key-here` | Django secret key |
| `DEBUG` | `False` | Production mode |

## Testing Your Deployment

Once deployed, test with:

```bash
# Register a user
curl -X POST https://your-app.vercel.app/api/register/ \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "email": "test@example.com", "password": "test123"}'

# Login
curl -X POST https://your-app.vercel.app/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "test123"}'
```

## ⚠️ Database Warning

**Your SQLite database resets frequently on Vercel!**

### For Production, Use PostgreSQL:

1. **Get Free PostgreSQL** from:
   - [Neon](https://neon.tech) - Free tier
   - [Supabase](https://supabase.com) - Free tier
   - [ElephantSQL](https://www.elephantsql.com) - Free tier

2. **Update requirements.txt**:
```bash
pip install psycopg2-binary
```

Add to `requirements.txt`:
```
psycopg2-binary==2.9.9
```

3. **Update settings.py**:
```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///tmp/db.sqlite3',
        conn_max_age=600
    )
}
```

4. **Add DATABASE_URL to Vercel**:
```bash
vercel env add DATABASE_URL
```
Paste your PostgreSQL connection string.

## Troubleshooting

### Issue: 500 Error
- Check Vercel logs: `vercel logs`
- Ensure SECRET_KEY is set
- Check ALLOWED_HOSTS includes `.vercel.app`

### Issue: Static files not loading
- Run: `python manage.py collectstatic`
- Redeploy: `vercel --prod`

### Issue: Database resets
- This is expected with SQLite on Vercel
- Switch to PostgreSQL (see above)

## Useful Commands

```bash
# View logs
vercel logs

# List deployments
vercel ls

# Remove project
vercel remove simple-expense-tracker

# Redeploy
vercel --prod
```

## Alternative: Use Render or Railway

If you want persistent SQLite:
- **Render**: Supports persistent disk storage
- **Railway**: Better Django support with persistent volumes

See `render.yaml` in this project for Render deployment.
