# OTR Copilot Visual Assets Guide

This folder contains all visual assets for the OTR Copilot case study page.

## Required Images

Extract these figures from your capstone report and save them in this directory:

### High Priority (Featured on Case Study Page)

1. **system-architecture.png**
   - Source: Figure 5 from report
   - Description: Modular architecture diagram showing Analysis Engine, Visualization Interface, and Integration Layer
   - Recommended size: 1200px wide (max)

2. **user-journey-map.png**
   - Source: Figure 3 from report
   - Description: User journey map highlighting pain points and intervention opportunities
   - Recommended size: 1200px wide (max)

3. **pattern-recognition.png**
   - Source: Figure 7 from report
   - Description: Pattern recognition dashboard showing emotion analysis
   - Recommended size: 1000px wide (max)

4. **context-analysis.png**
   - Source: Figure 8 from report
   - Description: Context analysis panel with baseline comparisons
   - Recommended size: 1000px wide (max)

5. **message-templates.png**
   - Source: Figures 9a and 9b from report
   - Description: Message template interface with customization options
   - Recommended size: 1000px wide (max)

6. **user-testing-session.png**
   - Source: Figure 20 from report
   - Description: Photo from April 17, 2025 testing session
   - Recommended size: 1000px wide (max)

### Medium Priority (Supporting Visuals)

7. **data-flow.png**
   - Source: Figure 6 from report
   - Description: Data flow across components
   - Recommended size: 1000px wide (max)

8. **ethics-framework.png**
   - Source: Figure 19 from report
   - Description: Structured mapping of ethical risks and safeguards
   - Recommended size: 1000px wide (max)

9. **development-timeline.png**
   - Source: Figure 13 from report
   - Description: Development timeline showing iterative phases
   - Recommended size: 1200px wide (max)

10. **resource-recommendation.png**
    - Source: Figure 10 from report
    - Description: Resource recommendation panel
    - Recommended size: 1000px wide (max)

### Optional (Additional Context)

11. **literature-domains.png**
    - Source: Figure 1 from report
    - Description: Integrated literature domains diagram

12. **hcd-process.png**
    - Source: Figure 2 from report
    - Description: Human-Centered Design process illustration

13. **refined-model.png**
    - Source: Figure 21 from report
    - Description: Refined model of Digital Emotional Intelligence Support

## Image Optimization Tips

1. **Format**: Save as PNG for diagrams/screenshots, JPG for photos
2. **Resolution**: 72-96 DPI for web (not print resolution)
3. **File size**: Aim for < 500KB per image (use compression if needed)
4. **Dimensions**: Max width 1200px (will be responsive on page)

## Tools for Optimization

- **Mac built-in**: Preview app (Tools > Adjust Size)
- **Online**: TinyPNG (https://tinypng.com/) for compression
- **Command line**: `sips` command (Mac) or ImageMagick

## Quick Batch Resize Example (Mac Terminal)

```bash
# Resize all images to max 1200px width
cd /Users/wooz/Documents/GitHub/wooziecodes.github.io/assets/img/otr-copilot
for img in *.png; do
  sips -Z 1200 "$img"
done
```

## After Adding Images

1. Uncomment the `<img>` tags in `otr-copilot.html`
2. Verify all images load correctly
3. Test responsive behavior on mobile/tablet
4. Optimize any images > 500KB

---

**Note**: All placeholder `<!-- <img> -->` comments in the HTML are marked where each image should appear. Simply uncomment and verify the file path matches.