# Quick Start Guide

## Local Development (5 minutes)

### 1. Install Dependencies
```bash
cd login-manager
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
- **User Portal**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/secret-admin-panel-x9k2m

### 4. Test the Application

**Test User Assignment:**
1. Go to http://localhost:3000
2. Enter email: `test@example.com`
3. Click "Get Login Credentials"
4. You should see a Salesforce URL, username, and password
5. Enter the same email again - you'll get the same credentials

**Test Admin Panel:**
1. Go to http://localhost:3000/secret-admin-panel-x9k2m
2. See all assignments
3. Search for the email you just used
4. Click "Reset" to unassign it

## Deploy to Heroku (10 minutes)

### 1. Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### 2. Login to Heroku
```bash
heroku login
```

### 3. Create & Deploy
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create Heroku app
heroku create your-app-name

# Deploy
git push heroku main

# Open app
heroku open
```

### 4. Access Your Deployed App
- **User Portal**: `https://your-app-name.herokuapp.com/`
- **Admin Panel**: `https://your-app-name.herokuapp.com/secret-admin-panel-x9k2m`

## Project Structure

```
login-manager/
├── app/
│   ├── page.tsx                    # User portal (main page)
│   ├── secret-admin-panel-x9k2m/   # Admin panel (hidden)
│   │   └── page.tsx
│   └── api/
│       ├── assign/route.ts         # Assign login to email
│       └── admin/
│           ├── logins/route.ts     # Get all logins
│           └── reset/route.ts      # Reset assignment
└── data/
    └── logins.json                 # All login credentials (999 entries)
```

## How It Works

1. **User enters email** → System checks if email already has assignment
2. **If new email** → Assigns first available login from `data/logins.json`
3. **If existing email** → Returns same login as before
4. **Admin can reset** → Makes login available again for new assignment

## Data Source

Login credentials are extracted from `Connections - All Orgs.xlsx` (RTOM tab):
- **Column A**: Login URL (Salesforce instances)
- **Column B**: Username
- **Column D**: Password

Currently has **999 unique logins** ready to assign.

## Important Notes

⚠️ **Data Persistence on Heroku**: 
The JSON file resets when Heroku restarts (every 24 hours minimum). For production use:
- Use PostgreSQL database instead
- See `DEPLOYMENT_CHECKLIST.md` for database setup

🔒 **Security**:
- Admin panel URL is hidden but not password-protected
- Consider adding authentication for production
- Always use HTTPS in production (automatic on Heroku)

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server

# Heroku
heroku logs --tail   # View live logs
heroku restart       # Restart app
heroku open          # Open in browser
heroku ps            # Check status
```

## Next Steps

1. ✅ Test locally
2. ✅ Deploy to Heroku
3. ⚠️ Set up PostgreSQL for data persistence (see `DEPLOYMENT_CHECKLIST.md`)
4. 🔒 Add authentication to admin panel
5. 📧 Add email notifications (optional)

## Need Help?

- **Detailed deployment**: See `HEROKU_DEPLOY.md`
- **Complete checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **General info**: See `README.md`

## Support

For issues:
1. Check `heroku logs --tail`
2. Review error messages
3. Verify all files are committed and pushed
4. Ensure `data/logins.json` exists with valid data

---

**That's it!** Your login assignment portal is ready to use. 🚀
