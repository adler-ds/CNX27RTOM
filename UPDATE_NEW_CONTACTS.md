# Contact List Update - New Excel File

## Summary

Updated login credentials from the new Excel file: **Connections - All Orgs NEW.xlsx**

## Key Changes

### 1. **Prioritized Assignment**
- Logins **WITH contacts** (17 total) are assigned FIRST
- Logins **WITHOUT contacts** (8 total) are assigned LAST
- This ensures users get contacts for Scott's demo site whenever possible

### 2. **Contact Email Generation**
- All contacts now have email addresses at **@scottsdemo.com**
- Format: `firstname.lastname@scottsdemo.com`
- Example: "Rachel Smith" → `rachel.smith@scottsdemo.com`

### 3. **Graceful Handling of Missing Contacts**
- If a login has no contact, users see a friendly message
- "No specific contact assigned - You can use any contact for this demo login"

## Contact List (17 with Contacts)

### Priority Logins (Assigned First):
1. **Rachel Smith** (rachel.smith@scottsdemo.com)
2. **Joe Brady** (joe.brady@scottsdemo.com)
3. **Bob Marley** (bob.marley@scottsdemo.com)
4. **Nick Fish** (nick.fish@scottsdemo.com)
5. **Matty Cook** (matty.cook@scottsdemo.com)
6. **Garry Speed** (garry.speed@scottsdemo.com)
7. **Sammy Lee** (sammy.lee@scottsdemo.com)
8. **John Adams** (john.adams@scottsdemo.com)
9. **Gabby Pearson** (gabby.pearson@scottsdemo.com)
10. **Chris Konan** (chris.konan@scottsdemo.com)
11. **Meg Grant** (meg.grant@scottsdemo.com)
12. **Cindy Parker** (cindy.parker@scottsdemo.com)
13. **Adam Smith** (adam.smith@scottsdemo.com)
14. **Edward Stamos** (edward.stamos@scottsdemo.com)
15. **Howard Jones** (howard.jones@scottsdemo.com)
16. **Leanne Tomlin** (leanne.tomlin@scottsdemo.com)
17. **Carole White** (carole.white@scottsdemo.com)

### Logins Without Contacts (Assigned Last):
- 8 logins without specific contacts
- Will show "No specific contact assigned" message
- Users can use any contact for these demo logins

## Technical Details

### Data Source
- **File**: `Connections - All Orgs NEW.xlsx`
- **Sheet**: RTOM
- **Column A**: Login URL
- **Column B**: Username
- **Column D**: Password
- **Column E**: Contact Name (NEW!)

### Processing Logic
```
1. Read Excel file
2. Extract all rows with URL, Username, Password
3. Check if Column E (Contact) has a value
4. Prioritize rows WITH contacts first
5. Append rows WITHOUT contacts at the end
6. Generate email addresses for all contacts
7. Save to data/logins.json
```

### Assignment Priority
```
User 1  → Rachel Smith (Contact)
User 2  → Joe Brady (Contact)
User 3  → Bob Marley (Contact)
...
User 17 → Carole White (Contact)
User 18 → No Contact
User 19 → No Contact
...
User 25 → No Contact
```

## User Experience

### With Contact (First 17 users):
```
╔══════════════════════════════════════════╗
║ Scott's Demo Site - Contact to Use       ║
║ Rachel Smith                             ║
║ rachel.smith@scottsdemo.com              ║
╚══════════════════════════════════════════╝

Login URL: https://rtom63.my.salesforce.com
Username: demouser1@rtom-262.com
Password: Abcd@12345
```

### Without Contact (Last 8 users):
```
╔══════════════════════════════════════════╗
║ No specific contact assigned             ║
║ You can use any contact for this login   ║
╚══════════════════════════════════════════╝

Login URL: https://rtom-ba.my.salesforce.com
Username: demouser23@rtom-262.com
Password: Abcde@123456
```

## Files Updated

- ✅ `data/logins.json` - Updated with new contacts and priority order
- ✅ `data/logins_backup.json` - Backup of old data
- ✅ `app/page.tsx` - Added conditional display for missing contacts
- ✅ Source: `Connections - All Orgs NEW.xlsx`

## Verification

### Total Logins: 25
- **With Contacts**: 17 (68%)
- **Without Contacts**: 8 (32%)

### Email Domain
All contacts use: **@scottsdemo.com**

### Build Status
✅ Build successful with no errors

## Testing

1. **Test with Contact**:
   - Go to http://localhost:3000
   - Enter email: `test1@example.com`
   - Should get Rachel Smith contact

2. **Test without Contact** (after 17 assignments):
   - Assign 17 logins first
   - Next assignment will show "No specific contact assigned"

3. **Admin Panel**:
   - Go to http://localhost:3000/secret-admin-panel-x9k2m
   - First 17 rows show contacts
   - Last 8 rows show empty contact fields

## Deployment

Ready to deploy:
```bash
git add .
git commit -m "Update contacts from new Excel file with prioritization"
git push origin main
```

For Heroku:
```bash
git push heroku main
```

---

**Status**: ✅ Complete
**Date**: June 4, 2026
**Source File**: Connections - All Orgs NEW.xlsx
**Priority**: Contacts first, then non-contacts
