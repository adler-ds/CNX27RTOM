# GitHub Deployment Guide

## Step-by-Step Instructions to Deploy to GitHub

### Step 1: Create a GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `login-manager` (or any name you prefer)
   - **Description**: `Login Assignment Portal - Salesforce credential management system`
   - **Visibility**: Choose **Private** (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR-USERNAME/login-manager.git

# Stage all files
git add .

# Commit all changes
git commit -m "Initial commit: Login Assignment Portal with admin panel"

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME`** with your actual GitHub username!

### Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Verify these key files are present:
   - `app/` directory
   - `data/logins.json`
   - `README.md`
   - `package.json`
   - `Procfile`

---

## Quick Commands (Copy & Paste)

### If you know your GitHub username:

```bash
# Replace YOUR-USERNAME with your GitHub username
git remote add origin https://github.com/YOUR-USERNAME/login-manager.git
git add .
git commit -m "Initial commit: Login Assignment Portal"
git push -u origin main
```

### To check your remote was added correctly:

```bash
git remote -v
```

You should see something like:
```
origin  https://github.com/YOUR-USERNAME/login-manager.git (fetch)
origin  https://github.com/YOUR-USERNAME/login-manager.git (push)
```

---

## Future Updates

After the initial push, when you make changes:

```bash
# Stage changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

---

## Important: Security Considerations

### ⚠️ Sensitive Data Warning

Your `data/logins.json` file contains **real login credentials** (usernames and passwords). 

**Options:**

### Option 1: Keep Repository Private (Recommended)
- Make sure your GitHub repository is set to **Private**
- Only you and collaborators you invite can see the code
- Credentials remain secure

### Option 2: Remove Credentials from GitHub
If you want a public repository, you should **NOT** commit the real credentials:

```bash
# Remove data/logins.json from git tracking
git rm --cached data/logins.json

# Add to .gitignore
echo "data/logins.json" >> .gitignore

# Create a sample file instead
cp data/logins.json data/logins.sample.json

# Edit logins.sample.json to have fake data
# Then commit
git add .gitignore data/logins.sample.json
git commit -m "Remove real credentials, add sample data"
git push
```

### Option 3: Use Environment Variables (Production Best Practice)
For production deployments:
- Store credentials in a database (PostgreSQL)
- Use environment variables for sensitive data
- Never commit real credentials to version control

---

## Troubleshooting

### Error: "remote origin already exists"
```bash
# Remove existing remote and add the correct one
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/login-manager.git
```

### Error: Authentication Failed
You may need to use a Personal Access Token instead of your password:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use the token as your password when pushing

Or use SSH instead:
```bash
# Use SSH URL instead
git remote set-url origin git@github.com:YOUR-USERNAME/login-manager.git
```

### Error: "Updates were rejected"
```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

---

## Repository Settings (After Upload)

### Add Repository Description
1. Go to your repository on GitHub
2. Click the gear icon next to "About"
3. Add description: "Login Assignment Portal - Automated Salesforce credential management"
4. Add topics: `nextjs`, `typescript`, `react`, `salesforce`, `credential-management`

### Add Collaborators (Optional)
1. Go to Settings → Collaborators
2. Add team members who need access

### Enable GitHub Pages (Optional)
Not applicable for this Next.js app (requires server-side rendering).
Use Heroku or Vercel for hosting instead.

---

## Next Steps After GitHub Upload

### 1. Deploy to Heroku
Follow `HEROKU_DEPLOY.md` for deployment instructions.

### 2. Link to Vercel (Alternative to Heroku)
1. Go to https://vercel.com
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel will auto-deploy

### 3. Set Up Continuous Deployment
Once connected to Heroku or Vercel:
- Every push to GitHub will automatically deploy
- No manual deployment needed

---

## GitHub Repository URL Structure

After deployment, your repository will be at:
```
https://github.com/YOUR-USERNAME/login-manager
```

You can share this URL with collaborators (if private, they need access).

---

## Summary

1. ✅ Create repository on GitHub
2. ✅ Add remote: `git remote add origin <URL>`
3. ✅ Commit files: `git add . && git commit -m "Initial commit"`
4. ✅ Push: `git push -u origin main`
5. ⚠️ Verify repository is **Private** if it contains real credentials
6. 🚀 Deploy to Heroku (see `HEROKU_DEPLOY.md`)

---

**Your code is now safely backed up on GitHub!** 🎉
