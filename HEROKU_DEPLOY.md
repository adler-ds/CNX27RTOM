# Deploying to Heroku

## Prerequisites
1. Create a Heroku account at https://heroku.com
2. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

## Deployment Steps

### 1. Login to Heroku
```bash
heroku login
```

### 2. Create a new Heroku app
```bash
heroku create your-app-name
# Or just use: heroku create (for a random name)
```

### 3. Verify the git remote was added
```bash
git remote -v
```

### 4. Deploy your application
```bash
git push heroku main
# If your branch is named 'master', use: git push heroku master
```

### 5. Ensure at least one instance is running
```bash
heroku ps:scale web=1
```

### 6. Open your application
```bash
heroku open
```

## Important Notes

### Data Persistence
The `data/logins.json` file will be reset every time the Heroku dyno restarts (at least once per 24 hours on free tier). For production use, you should:

1. Use a database (PostgreSQL, MongoDB, etc.) instead of JSON file storage
2. Or use Heroku Persistent File System add-on

### To add PostgreSQL (Recommended for production):
```bash
heroku addons:create heroku-postgresql:essential-0
```

Then modify the API routes to use PostgreSQL instead of the JSON file.

### Checking Logs
```bash
heroku logs --tail
```

### Environment Variables
Set any required environment variables:
```bash
heroku config:set VARIABLE_NAME=value
```

### View your app's URL
```bash
heroku info
```

## Access Points After Deployment

- **User Portal**: `https://your-app-name.herokuapp.com/`
- **Admin Panel**: `https://your-app-name.herokuapp.com/secret-admin-panel-x9k2m`

## Updating Your App

After making changes:
```bash
git add .
git commit -m "Your commit message"
git push heroku main
```

## Troubleshooting

If build fails:
```bash
# Check logs
heroku logs --tail

# Restart the app
heroku restart
```

If routes don't work:
- Make sure your `package.json` has the correct start script
- Verify the PORT environment variable is being used (Next.js handles this automatically)

## Upgrading Dyno Type (Optional)

Free dynos sleep after 30 minutes of inactivity. To keep your app always awake:
```bash
heroku ps:type hobby
# This costs $7/month
```
