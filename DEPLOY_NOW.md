# 🚀 Quick Deploy to Vercel

## One-Time Setup
```bash
npm install -g vercel
vercel login
```

## Deploy Now
```bash
vercel --prod
```

## ⚠️ CRITICAL WARNING
**SQLite resets on every deployment!** Data will be lost.

For production → Use PostgreSQL (Neon.tech free tier)

## Your API will be at:
`https://your-project.vercel.app/api/`

## Test Endpoints:
- POST `/api/register/` - Create account
- POST `/api/login/` - Get JWT token
- GET `/api/expenses/` - List expenses (needs auth)

See `VERCEL_DEPLOY.md` for full guide.
