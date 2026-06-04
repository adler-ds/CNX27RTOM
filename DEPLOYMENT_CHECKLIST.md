# Deployment Checklist

## Pre-Deployment Checklist

- [ ] Excel data extracted to `data/logins.json`
- [ ] All dependencies installed (`npm install`)
- [ ] Application builds successfully (`npm run build`)
- [ ] Tested locally (`npm run dev`)
- [ ] Git repository initialized
- [ ] All files committed to git

## Heroku Deployment Steps

### 1. Install Heroku CLI

**macOS (using Homebrew):**
```bash
brew tap heroku/brew && brew install heroku
```

**Windows:**
Download from: https://devcenter.heroku.com/articles/heroku-cli

**Linux:**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

### 2. Login to Heroku

```bash
heroku login
```

This will open a browser window for authentication.

### 3. Create Heroku Application

```bash
# Create with a specific name
heroku create your-app-name

# OR create with auto-generated name
heroku create
```

The command will output your app URL, like: `https://your-app-name.herokuapp.com`

### 4. Verify Git Remote

```bash
git remote -v
```

You should see a `heroku` remote pointing to your Heroku app.

### 5. Deploy to Heroku

```bash
# Make sure all changes are committed
git add .
git commit -m "Initial deployment"

# Push to Heroku
git push heroku main
```

If your default branch is `master`:
```bash
git push heroku master
```

### 6. Scale the Web Dyno

```bash
heroku ps:scale web=1
```

### 7. Open Your Application

```bash
heroku open
```

## Post-Deployment Verification

### Test User Portal
1. Visit: `https://your-app-name.herokuapp.com/`
2. Enter an email address
3. Verify you receive login credentials
4. Test with the same email again (should get same credentials)

### Test Admin Panel
1. Visit: `https://your-app-name.herokuapp.com/secret-admin-panel-x9k2m`
2. Verify you can see all logins
3. Verify statistics are correct
4. Test resetting an assignment
5. Test search functionality

## Monitoring & Maintenance

### View Application Logs
```bash
heroku logs --tail
```

### Check Dyno Status
```bash
heroku ps
```

### Restart Application
```bash
heroku restart
```

### View Application Info
```bash
heroku info
```

## Important Notes

### Data Persistence Warning

⚠️ **CRITICAL**: The `data/logins.json` file will reset every time the Heroku dyno restarts (at least once per 24 hours on free/hobby tiers).

**Solutions:**

1. **Use a Database (Recommended for Production)**
   ```bash
   heroku addons:create heroku-postgresql:essential-0
   ```
   Then modify the API routes to use PostgreSQL.

2. **Use AWS S3 for File Storage**
   Store the JSON file in S3 and read/write from there.

3. **Upgrade to Performance Dynos**
   Performance dynos have longer uptimes but still restart occasionally.

### Environment Variables

Set any required environment variables:
```bash
heroku config:set VARIABLE_NAME=value
```

View all environment variables:
```bash
heroku config
```

### Custom Domain (Optional)

To use your own domain:
```bash
heroku domains:add www.yourdomain.com
```

Then configure your DNS provider to point to Heroku.

### SSL Certificate

Heroku provides free SSL certificates automatically. Your site will be available via HTTPS.

## Updating the Application

When you make changes to the code:

```bash
# 1. Test locally
npm run dev

# 2. Build to verify no errors
npm run build

# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Deploy to Heroku
git push heroku main

# 5. Verify deployment
heroku open
heroku logs --tail
```

## Troubleshooting

### Build Fails

Check the build logs:
```bash
heroku logs --tail
```

Common issues:
- Missing dependencies in `package.json`
- TypeScript errors
- Missing environment variables

### Application Crashes

View crash logs:
```bash
heroku logs --tail
```

Check dyno status:
```bash
heroku ps
```

Restart application:
```bash
heroku restart
```

### Routes Not Working

- Verify your Next.js app is built correctly
- Check that `PORT` environment variable is being used (Next.js handles this automatically)
- Review Heroku logs for errors

### Data Loss Issues

If assignments keep resetting:
- This is expected behavior with file-based storage on Heroku
- Implement database storage (PostgreSQL) for persistence
- See database migration guide below

## Database Migration Guide (Recommended)

To use PostgreSQL instead of JSON file:

### 1. Add PostgreSQL
```bash
heroku addons:create heroku-postgresql:essential-0
```

### 2. Install Postgres Client
```bash
npm install pg
npm install --save-dev @types/pg
```

### 3. Modify API Routes
Update `app/api/assign/route.ts` and `app/api/admin/*/route.ts` to use PostgreSQL instead of reading/writing JSON files.

### 4. Create Database Schema
```sql
CREATE TABLE logins (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  assigned BOOLEAN DEFAULT FALSE,
  assigned_to TEXT
);
```

### 5. Populate Database
Run a migration script to import data from `data/logins.json` into PostgreSQL.

## Cost Considerations

### Free Tier (Eco Dynos)
- Free for up to 1000 dyno hours per month
- Sleeps after 30 minutes of inactivity
- Resets file system on restart

### Basic ($7/month)
- Does not sleep
- Still resets file system periodically
- Better for production

### With PostgreSQL Essential-0 ($5/month)
- Persistent data storage
- 20 GB storage
- 20 connections

**Recommended for Production:** Basic dyno + PostgreSQL = $12/month

## Support

If you encounter issues:
1. Check Heroku logs: `heroku logs --tail`
2. Review this checklist
3. Consult [Heroku documentation](https://devcenter.heroku.com/)
4. Check [Next.js deployment docs](https://nextjs.org/docs/deployment)

## Quick Reference

```bash
# Essential Heroku Commands
heroku login              # Login to Heroku
heroku create            # Create new app
heroku open              # Open app in browser
heroku logs --tail       # View live logs
heroku ps                # Check dyno status
heroku restart           # Restart app
heroku config            # View env variables
heroku info              # App information
```
