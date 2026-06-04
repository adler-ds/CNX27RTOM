# PDF Session Guide Integration

## Summary

Added embedded PDF viewer and download link for the RTOM Merkle Session guide on the credentials screen.

## What Was Added

### PDF File
- **Original**: `Real Time Offer Management (RTOM) - Merkle Session.pdf`
- **Location**: `public/RTOM-Guide.pdf`
- **Size**: 6.6MB
- **Accessible at**: `/RTOM-Guide.pdf`

### Features

#### 1. **Embedded PDF Viewer**
- Shows PDF directly in the page
- 400px height iframe
- Scrollable for full document viewing
- Orange-themed section for visibility

#### 2. **Download Options**
- "Download PDF Guide" link below viewer
- Alternative download link in Step 3 box
- Downloaded as: `RTOM-Merkle-Session-Guide.pdf`

#### 3. **Strategic Placement**
- Appears on second screen (after credential assignment)
- Located below credentials section
- Above "Check Another Email" button
- In context with Steps 3 instructions

## Visual Layout

### Step 3 Box (Purple)
```
╔══════════════════════════════════════════╗
║ [3] Step 3: Experience Your Personalized ║
║     Scott's Demo Site                    ║
║     https://promo-ups-org2-...           ║
║                                          ║
║     📚 Session Guide                     ║
║     View RTOM - Merkle Session Guide     ║
║     Download PDF                         ║
╚══════════════════════════════════════════╝
```

### PDF Viewer Section (Orange)
```
╔══════════════════════════════════════════╗
║ 📄 Follow Along with the Session Guide   ║
║ The RTOM guide provides step-by-step...  ║
║                                          ║
║ ┌────────────────────────────────────┐  ║
║ │                                    │  ║
║ │     [PDF CONTENT DISPLAYED]        │  ║
║ │     (Scrollable iframe)            │  ║
║ │                                    │  ║
║ └────────────────────────────────────┘  ║
║                                          ║
║     ⬇️ Download PDF Guide                ║
╚══════════════════════════════════════════╝
```

## User Experience Flow

1. User enters email and gets credentials
2. Sees Step 3 with demo site link and PDF link
3. Sees PDF viewer embedded below
4. Can scroll through PDF to follow instructions
5. Can download PDF for offline reference
6. Can open PDF in new tab for full-screen view

## Technical Implementation

### PDF Access
```html
<iframe
  src="/RTOM-Guide.pdf"
  className="w-full h-96 border-0"
  title="RTOM Session Guide"
/>
```

### Download Links
```html
<a
  href="/RTOM-Guide.pdf"
  download="RTOM-Merkle-Session-Guide.pdf"
  className="..."
>
  Download PDF Guide
</a>
```

### File Location
```
public/
  └── RTOM-Guide.pdf  (6.6MB)
```

## Benefits

1. **Convenience**: Users don't need to leave the page
2. **Context**: Guide is available right when they need it
3. **Flexibility**: Can view inline or download
4. **Follow Along**: Can reference guide while using credentials
5. **Accessibility**: Multiple ways to access (view/download/new tab)

## Color Scheme

- **Orange themed** section for the PDF viewer
- Orange border and background (`border-orange-200`, `bg-orange-50`)
- Orange text for headings (`text-orange-900`)
- Distinguishes from Step 1 (green), Step 2 (blue), Step 3 (purple)

## Download Naming

When users click "Download PDF":
- **Downloaded as**: `RTOM-Merkle-Session-Guide.pdf`
- Original name was too long for display
- Cleaned up version is more user-friendly

## Browser Compatibility

### PDF Viewing
- ✅ Chrome/Edge: Native PDF viewer
- ✅ Safari: Native PDF viewer
- ✅ Firefox: Native PDF viewer
- ⚠️ Mobile: May open in separate app
- 🔄 Fallback: Download link always available

## File Size Consideration

- **Size**: 6.6MB
- **Impact**: Adds ~7MB to deployment
- **Acceptable**: Within normal limits for documentation
- **Cached**: Browsers cache PDF after first load

## Testing

### Test PDF Viewer:
1. Go to http://localhost:3000
2. Enter email and get credentials
3. Scroll down to orange "Follow Along" section
4. Verify PDF loads in iframe
5. Verify scrolling works within PDF

### Test Download:
1. Click "⬇️ Download PDF Guide" link
2. Verify download starts
3. Verify filename is `RTOM-Merkle-Session-Guide.pdf`

### Test New Tab:
1. Click "View RTOM..." link in purple box
2. Verify PDF opens in new tab
3. Verify full PDF controls available

## Files Modified

- ✅ `app/page.tsx` - Added PDF viewer and links
- ✅ `public/RTOM-Guide.pdf` - Added PDF file (6.6MB)

## Deployment Notes

### Git
- PDF file will be committed to repository
- Increases repo size by ~7MB
- Acceptable for documentation purposes

### Heroku
- PDF will be deployed with application
- Accessible at: `https://your-app.herokuapp.com/RTOM-Guide.pdf`
- No special configuration needed
- Next.js automatically serves files from `public/`

## URLs

### Local Development
- **PDF URL**: http://localhost:3000/RTOM-Guide.pdf
- **Page**: http://localhost:3000

### Production (After Heroku Deploy)
- **PDF URL**: https://your-app.herokuapp.com/RTOM-Guide.pdf
- **Page**: https://your-app.herokuapp.com/

## Alternative Approaches Considered

1. ❌ **External PDF hosting**: Adds complexity, not needed
2. ❌ **Convert to HTML**: Loses formatting, too much work
3. ✅ **Embedded iframe**: Simple, works everywhere
4. ✅ **Direct download**: Good fallback option

## Future Enhancements

- [ ] Add page navigation controls
- [ ] Add zoom controls
- [ ] Mobile-optimized PDF viewer
- [ ] Multi-language support
- [ ] Update notification when PDF changes

---

**Status**: ✅ Complete
**Build**: ✅ Successful
**PDF Size**: 6.6MB
**Location**: `public/RTOM-Guide.pdf`
**Display**: Embedded iframe + download links
