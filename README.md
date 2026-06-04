# Login Assignment Portal

A Next.js application that manages login credential assignments from an Excel spreadsheet. Users can request login credentials by providing their email address, and administrators can monitor assignments and reset them as needed.

## Features

- **User Portal**: Simple interface for users to get assigned login credentials
- **Email-Based Assignment**: Each email gets a unique login that persists on subsequent visits
- **One-Time Assignment**: Once a login is assigned, it cannot be reassigned to another user
- **Hidden Admin Panel**: Secret URL for administrators to monitor all assignments
- **Reset Functionality**: Admins can reset any assignment to make it available again
- **Search & Filter**: Admin panel includes search and filtering capabilities

## Project Structure

```
login-manager/
├── app/
│   ├── page.tsx                          # User-facing assignment page
│   ├── secret-admin-panel-x9k2m/         # Hidden admin panel
│   │   └── page.tsx
│   └── api/
│       ├── assign/route.ts               # API: Assign login to email
│       └── admin/
│           ├── logins/route.ts           # API: Get all logins
│           └── reset/route.ts            # API: Reset assignment
├── data/
│   └── logins.json                       # Login credentials database
├── Procfile                              # Heroku configuration
└── HEROKU_DEPLOY.md                      # Deployment instructions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd login-manager
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### For Users

1. Navigate to the home page
2. Enter your email address
3. Click "Get Login Credentials"
4. Your login credentials will be displayed (URL, Username, Password)
5. If you return with the same email, you'll get the same credentials

### For Administrators

1. Navigate to `/secret-admin-panel-x9k2m` (hidden URL)
2. View all login assignments and statistics
3. Search by email, username, or URL
4. Filter by assignment status
5. Reset any assignment to make it available again

## Data Source

The login credentials are imported from the **RTOM** tab of the Excel file:
- Column A: Login URL (hyperlink)
- Column B: Username
- Column D: Password

## API Endpoints

### POST /api/assign
Assigns a login to an email address or returns existing assignment.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "login": {
    "url": "https://example.com",
    "username": "user@demo.com",
    "password": "password123"
  },
  "message": "New login assigned successfully"
}
```

### GET /api/admin/logins
Returns all logins and statistics.

**Response:**
```json
{
  "logins": [...],
  "stats": {
    "total": 999,
    "assigned": 25,
    "available": 974
  }
}
```

### POST /api/admin/reset
Resets a login assignment.

**Request:**
```json
{
  "loginId": 5
}
```

## Deploying to Heroku

See [HEROKU_DEPLOY.md](./HEROKU_DEPLOY.md) for detailed deployment instructions.

### Quick Deploy

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main

# Open
heroku open
```

**Important:** The JSON file storage resets on Heroku dyno restarts. For production, consider using a database (PostgreSQL, MongoDB, etc.).

## Environment Variables

No environment variables are required for basic functionality. For production, you may want to add:

- `NODE_ENV=production` (automatically set by Heroku)
- `ADMIN_PASSWORD` (if you want to add authentication to admin panel)

## Security Considerations

1. **Admin Panel URL**: The admin panel uses a secret URL path. Consider adding authentication for production use.
2. **Data Persistence**: Current implementation uses JSON file storage which resets on server restart (especially on Heroku). Use a database for production.
3. **HTTPS**: Always use HTTPS in production (automatically enabled on Heroku).

## Future Enhancements

- [ ] Add authentication to admin panel
- [ ] Replace JSON file with PostgreSQL database
- [ ] Add email notifications when credentials are assigned
- [ ] Export assignment history to CSV
- [ ] Add rate limiting to prevent abuse
- [ ] Add logging and audit trail

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Heroku (Node.js)

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
