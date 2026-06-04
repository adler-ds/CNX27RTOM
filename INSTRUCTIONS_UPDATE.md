# Home Page Instructions Update

## Summary

Updated the home page to include comprehensive 3-step instructions for Scott's personalized demo experience.

## What Changed

### New User Experience Flow

The home page now guides users through a **3-step process**:

#### **Step 1: View the Read-Only Demo** (Green Box)
- Access the read-only Salesforce org first
- See Scott's personalized experience in action
- Provides ready-to-use credentials:
  - **URL**: login.salesforce.com
  - **Username**: promoupsdemo2@example.com
  - **Password**: Abcd@1234

#### **Step 2: Get Your Own Interactive Org** (Blue Box)
- Request personal credentials for an interactive org
- Create your own offers
- Get a Contact record for personalization
- User enters their email to get assigned credentials

#### **Step 3: Experience Your Personalized Demo** (Purple Box)
- After getting credentials, visit Scott's demo site
- **Demo Site URL**: https://promo-ups-org2-4ff2cdd3b3d9.herokuapp.com/
- Use assigned credentials to log into personal org
- Experience personalized offers and interactions

## Visual Design

### Color-Coded Steps
- **Step 1**: Green gradient with green border
- **Step 2**: Blue gradient with blue border
- **Step 3**: Purple gradient with purple border (shown after assignment)

### Numbered Badges
- Each step has a circular numbered badge (1, 2, 3)
- Makes the flow clear and easy to follow

### Layout Improvements
- Wider container (`max-w-2xl` instead of `max-w-md`)
- More space for detailed instructions
- Clear visual hierarchy with borders and backgrounds

## Complete User Journey

### Before Assignment:
```
┌─────────────────────────────────────────┐
│ Scott's Personalized Demo Experience    │
├─────────────────────────────────────────┤
│ [1] Step 1: View the Read-Only Demo    │
│     URL: login.salesforce.com           │
│     User: promoupsdemo2@example.com     │
│     Pass: Abcd@1234                     │
├─────────────────────────────────────────┤
│ [2] Step 2: Get Your Own Interactive   │
│     Enter your email: [____________]    │
│     [Get My Personal Org Credentials]   │
└─────────────────────────────────────────┘
```

### After Assignment:
```
┌─────────────────────────────────────────┐
│ Scott's Personalized Demo Experience    │
├─────────────────────────────────────────┤
│ [3] Step 3: Experience Your Personal... │
│     Demo Site:                          │
│     https://promo-ups-org2-...          │
├─────────────────────────────────────────┤
│ Your Personal Org Credentials           │
│ Contact: Rachel Smith                   │
│ URL: https://rtom63.my.salesforce.com   │
│ Username: demouser1@rtom-262.com        │
│ Password: Abcd@12345                    │
└─────────────────────────────────────────┘
```

## Key Features

### 1. Read-Only Credentials (Step 1)
- Always visible on initial page load
- Clickable link to login.salesforce.com
- Copy-friendly credential display
- Green color scheme indicates "viewing" mode

### 2. Request Form (Step 2)
- Email input for credential assignment
- Clear call-to-action button
- Blue color scheme indicates "interactive" mode
- Explains what user will receive

### 3. Demo Site Access (Step 3)
- Shows after credentials are assigned
- Direct link to Scott's demo site
- Purple color scheme indicates "personalized experience"
- Clear instructions to use org credentials first

### 4. Contact Information
- Displayed when available (17 priority logins)
- Shows contact name and email for Scott's demo
- Formatted in highlighted box

## Technical Changes

### Files Modified
- `app/page.tsx` - Complete home page redesign

### CSS Classes Used
- Gradient backgrounds: `from-green-50 to-emerald-50`, etc.
- Border colors: `border-green-300`, `border-blue-300`, `border-purple-300`
- Numbered badges: Circular divs with step numbers
- Wider container: `max-w-2xl` for more space

### Button Text
Changed from: "Get Login Credentials"
Changed to: "Get My Personal Org Credentials"

### Page Title
Changed from: "Login Assignment Portal"
Changed to: "Scott's Personalized Demo Experience"

## User Benefits

1. **Clear Instructions**: Step-by-step guidance for complete experience
2. **No Confusion**: Explains read-only vs. interactive orgs
3. **Direct Links**: Clickable URLs for easy access
4. **Visual Flow**: Numbered steps with color coding
5. **Complete Journey**: From viewing demo to creating personalized offers

## Testing

### Test Step 1 Display:
1. Go to http://localhost:3000
2. Verify green "Step 1" box is visible
3. Verify read-only credentials are displayed
4. Click login.salesforce.com link (should open Salesforce)

### Test Step 2 Flow:
1. Enter email address
2. Click "Get My Personal Org Credentials"
3. Verify assignment works

### Test Step 3 Display:
1. After assignment, verify purple "Step 3" box appears
2. Verify demo site link is displayed
3. Verify personal org credentials are shown below
4. Click demo site link (should open Heroku app)

## Demo Site Information

**URL**: https://promo-ups-org2-4ff2cdd3b3d9.herokuapp.com/

**Purpose**: 
- Personalized Scott's experience
- Users can create offers
- Contact records provide personalization
- Interactive demo environment

## Read-Only Org Information

**URL**: login.salesforce.com

**Credentials**:
- Username: promoupsdemo2@example.com
- Password: Abcd@1234

**Purpose**:
- View-only access
- See Scott's personalized experience
- No editing capabilities
- Reference implementation

## Deployment

Build successful with no errors. Ready to deploy:

```bash
git add .
git commit -m "Add 3-step instructions with read-only and demo site info"
git push origin main
```

For Heroku:
```bash
git push heroku main
```

---

**Status**: ✅ Complete
**Build**: ✅ Successful
**Design**: 3-step color-coded flow
**Links**: Read-only org + Demo site included
