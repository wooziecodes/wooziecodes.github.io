# OTR Copilot Website Setup Checklist

## ✅ Completed (Already Done)

- [x] Updated `research.html` with enhanced OTR Copilot summary
- [x] Created comprehensive `otr-copilot.html` case study page
- [x] Created asset folder structure:
  - `/assets/img/otr-copilot/`
  - `/assets/pdf/`
- [x] Added README guides for asset organization

## 📋 Your Action Items

### 1. Add Visual Assets (High Priority)

Extract images from your capstone report and add to `/assets/img/otr-copilot/`:

- [ ] **system-architecture.png** (Figure 5)
- [ ] **user-journey-map.png** (Figure 3)
- [ ] **pattern-recognition.png** (Figure 7)
- [ ] **context-analysis.png** (Figure 8)
- [ ] **message-templates.png** (Figures 9a/9b)
- [ ] **user-testing-session.png** (Figure 20)

Optional but recommended:
- [ ] **data-flow.png** (Figure 6)
- [ ] **ethics-framework.png** (Figure 19)
- [ ] **development-timeline.png** (Figure 13)

**See**: `/assets/img/otr-copilot/README.md` for detailed instructions

### 2. Add PDF Report

- [ ] Save your final capstone report as `otr-capstone-report.pdf`
- [ ] Place in `/assets/pdf/otr-capstone-report.pdf`
- [ ] Optimize file size if needed (aim for < 10MB)

**See**: `/assets/pdf/README.md` for optimization tips

### 3. Update External Links

In `research.html` (line 144) and `otr-copilot.html`, update:

- [ ] **Demo video URL**: Replace `https://youtu.be/demo-link` with your actual YouTube link
- [ ] Verify **GitHub repository link**: `https://github.com/wooziecodes/otr-copilot` is correct

### 4. Uncomment Image Tags

In `otr-copilot.html`, after adding images:

- [ ] Find all `<!-- <img src="./assets/img/otr-copilot/...">` comments
- [ ] Uncomment them (remove `<!--` and `-->`)
- [ ] Verify file paths match your uploaded images

Example:
```html
<!-- BEFORE -->
<!-- <img src="./assets/img/otr-copilot/system-architecture.png" alt="System Architecture" class="case-image"> -->

<!-- AFTER -->
<img src="./assets/img/otr-copilot/system-architecture.png" alt="System Architecture" class="case-image">
```

### 5. Test Locally

- [ ] Open `index.html` in your browser
- [ ] Navigate: Home → Research → OTR Copilot project
- [ ] Click "Read the full case study" link
- [ ] Verify all sections display correctly
- [ ] Test all navigation links work
- [ ] Click "Download Full Report (PDF)" to test PDF link
- [ ] Click "Watch Demo Video" to test YouTube link
- [ ] Click "GitHub Repository" to verify link
- [ ] Test on mobile/tablet (responsive design)

### 6. Deploy to GitHub Pages

```bash
cd /Users/wooz/Documents/GitHub/wooziecodes.github.io

# Check what changed
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Add OTR Copilot capstone project showcase

- Enhanced research.html with comprehensive project summary
- Created otr-copilot.html standalone case study page
- Added visual assets and PDF report
- Updated navigation and cross-page links"

# Push to GitHub
git push origin main
```

- [ ] Commit and push changes
- [ ] Wait 2-5 minutes for GitHub Pages to rebuild
- [ ] Visit `https://wooziecodes.github.io/otr-copilot.html`
- [ ] Verify everything works live

### 7. Final Quality Checks

- [ ] All images load correctly
- [ ] No broken links (use browser console to check)
- [ ] Text is readable and well-formatted
- [ ] Page looks good on desktop, tablet, mobile
- [ ] PDF downloads successfully
- [ ] Demo video plays correctly
- [ ] GitHub link goes to correct repository
- [ ] Navigation between pages works smoothly

## 🎨 Optional Enhancements

Once core functionality is working:

- [ ] Add Open Graph meta tags for better social media sharing
- [ ] Create a project thumbnail/hero image for research.html
- [ ] Add Google Analytics (if you want to track visitors)
- [ ] Consider adding a "Back to Top" button for the long case study page
- [ ] Add schema.org markup for better SEO

## 🐛 Troubleshooting

**Images not showing?**
- Check file paths are correct (case-sensitive!)
- Verify images are in `/assets/img/otr-copilot/`
- Open browser console (F12) to see any 404 errors

**PDF not downloading?**
- Confirm file is named exactly `otr-capstone-report.pdf`
- Check it's in `/assets/pdf/` folder
- Verify file size isn't too large (< 25MB for GitHub)

**Links not working?**
- Use relative paths (not absolute)
- Ensure file extensions are correct (.html)
- Check for typos in href attributes

**Page looks broken on mobile?**
- The CSS is already responsive
- Test with browser dev tools (F12 > Toggle Device Toolbar)
- Check if any images are too wide

## 📧 Questions?

If you encounter issues, check:
1. Browser console for errors (F12 > Console tab)
2. GitHub Pages deployment status
3. File paths and naming conventions

---

**You're almost there!** Once you complete the action items above, your OTR Copilot project will be beautifully showcased on your website. 🚀