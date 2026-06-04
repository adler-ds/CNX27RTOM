# 🚀 START HERE

## Your Login Assignment Portal is Complete!

This application manages login credential assignments from your Excel file. Users enter their email and get assigned unique Salesforce login credentials.

---

## ⚡ Quick Test (2 minutes)

```bash
# 1. Start the development server
npm run dev

# 2. Open your browser to:
#    - User Portal: http://localhost:3000
#    - Admin Panel: http://localhost:3000/secret-admin-panel-x9k2m

# 3. Test it:
#    - Enter an email address
#    - Get credentials
#    - Try the same email again (should get same credentials)
#    - Go to admin panel and see the assignment
#    - Click "Reset" to unassign
```

---

## 🌐 Deploy to Heroku (5 minutes)

### Step 1: Install Heroku CLI

**macOS:**
```bash
brew tap heroku/brew && brew install heroku
```

**Windows/Linux:** Download from https://devcenter.heroku.com/articles/heroku-cli

### Step 2: Deploy

```bash
# Login
heroku login

# Create app (choose your own name)
heroku create your-app-name

# Deploy
git add .
git commit -m "Initial deployment"
git push heroku main

# Open your app
heroku open
```

### Step 3: Access Your Live App

- **User Portal**: `https://your-app-name.herokuapp.com/`
- **Admin Panel**: `https://your-app-name.herokuapp.com/secret-admin-panel-x9k2m`

---

## 📊 What's Included

### User Features
- ✅ Enter email to get login credentials
- ✅ Automatically assigned from pool of 25 logins
- ✅ Same email = same credentials every time
- ✅ Clean, modern interface

### Admin Features (Hidden URL)
- ✅ View all 25 login assignments
- ✅ See statistics (total, assigned, available)
- ✅ Search by email, username, or URL
- ✅ Filter by assignment status
- ✅ Reset any assignment

### Technical
- ✅ Built with Next.js 16 + TypeScript
- ✅ Responsive Tailwind CSS design
- ✅ API routes for all operations
- ✅ Data extracted from Excel RTOM tab
- ✅ Ready for Heroku deployment

---

## 📁 Project Files

```
login-manager/
├── app/
│   ├── page.tsx                        ← User portal (main page)
│   ├── secret-admin-panel-x9k2m/
│   │   └── page.tsx                    ← Admin panel (hidden)
│   └── api/
│       ├── assign/route.ts             ← Assign login to email
│       └── admin/
│           ├── logins/route.ts         ← Get all logins
│           └── reset/route.ts          ← Reset assignment
├── data/
│   └── logins.json                     ← 25 login credentials
├── scripts/
│   └── extract-logins.py               ← Re-extract from Excel
├── Procfile                            ← Heroku config
├── package.json                        ← Dependencies
└── Documentation:
    ├── README.md                       ← Full documentation
    ├── QUICKSTART.md                   ← Fast setup guide
    ├── HEROKU_DEPLOY.md                ← Heroku deployment
    ├── DEPLOYMENT_CHECKLIST.md         ← Pre/post deploy tasks
    ├── PROJECT_SUMMARY.md              ← Technical overview
    ├── PROJECT_OVERVIEW.txt            ← Quick reference
    └── START_HERE.md                   ← This file!
```

---

## 🎯 Data Summary

**Source**: `Connections - All Orgs.xlsx` (RTOM tab)

**Extracted**: 25 Salesforce login credentials
- Column A → Login URL (e.g., https://rtom63.my.salesforce.com)
- Column B → Username (e.g., demouser1@rtom-262.com)
- Column D → Password (e.g., Abcd@12345)

All saved in: `data/logins.json`

---

## ⚠️ Important Notes

### 1. Admin Panel Security
- **URL**: `/secret-admin-panel-x9k2m` (hidden but not password-protected)
- **Recommendation**: Add authentication for production use

### 2. Data Persistence on Heroku
- JSON file resets when Heroku restarts (every 24 hours minimum)
- **Solution**: Use PostgreSQL for production (see DEPLOYMENT_CHECKLIST.md)

### 3. Assignment Rules
- Each email gets ONE login (first available)
- Same email = same login every time
- Admins can reset to make available again
- Once assigned, login can't be assigned to another email (until reset)

---

## 🔧 Common Commands

### Development
```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Build for production
npm start         # Run production build locally
```

### Heroku
```bash
heroku login          # Login to Heroku
heroku create         # Create new app
heroku open           # Open app in browser
heroku logs --tail    # View live logs
heroku restart        # Restart app
heroku ps             # Check dyno status
```

### Data Management
```bash
# Re-extract from Excel file (if needed)
python3 scripts/extract-logins.py "../Connections - All Orgs.xlsx"
```

---

## 💰 Heroku Costs

| Tier | Cost | Features |
|------|------|----------|
| **Free (Eco)** | $0/month | 1000 hours/month, sleeps after 30min inactivity |
| **Basic** | $7/month | No sleep, always-on |
| **Basic + PostgreSQL** | $12/month | No sleep + persistent database |

**Recommendation**: Start with Free tier for testing, upgrade to Basic + PostgreSQL for production.

---

## 🚨 Troubleshooting

### Build Fails
```bash
npm install          # Reinstall dependencies
npm run build        # Try building again
```

### Heroku Deploy Fails
```bash
heroku logs --tail   # Check error logs
git push heroku main --force  # Force push if needed
```

### Data Not Saving
- Expected behavior on Heroku free/basic tier (file system resets)
- Solution: Set up PostgreSQL (see DEPLOYMENT_CHECKLIST.md)

### Admin Panel Not Loading
- Make sure URL is exactly: `/secret-admin-panel-x9k2m`
- Check browser console for errors

---

## 📚 Need More Info?

1. **Quick Setup** → Read `QUICKSTART.md`
2. **Heroku Details** → Read `HEROKU_DEPLOY.md`
3. **Full Documentation** → Read `README.md`
4. **Technical Details** → Read `PROJECT_SUMMARY.md`
5. **Deployment Steps** → Read `DEPLOYMENT_CHECKLIST.md`

---

## ✅ Next Steps

### For Testing
1. ✅ Run `npm run dev`
2. ✅ Test user portal at http://localhost:3000
3. ✅ Test admin panel at http://localhost:3000/secret-admin-panel-x9k2m
4. ✅ Try assigning, checking, and resetting logins

### For Production
1. ⬜ Deploy to Heroku (see above)
2. ⬜ Test deployed version
3. ⬜ Set up PostgreSQL for data persistence
4. ⬜ Add authentication to admin panel
5. ⬜ (Optional) Set up custom domain

---

## 🎉 You're All Set!

Everything is ready to go. Just run `npm run dev` to test locally, or follow the Heroku deployment steps above.

**Questions?** Check the documentation files listed above.

**Ready to deploy?** Run these commands:
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku open
```

---

**Built with Next.js 16 • TypeScript • Tailwind CSS • Ready for Heroku**

*Your login assignment portal is ready! 🚀*
