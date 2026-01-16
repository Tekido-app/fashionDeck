# Landing Page Redesign - Task Checklist

## Phase 1: Image Integration ✅

- [x] Create `apps/web/public/` directory
- [x] Copy uploaded images to public folder
  - [x] hero-collage.jpg
  - [x] outfit-korean.jpg
  - [x] outfit-streetwear.jpg
  - [x] outfit-vintage.jpg

## Phase 2: Code Updates 🔄

### Task 2.1: Update Image References

- [ ] Replace hero Unsplash URL with `/hero-collage.jpg`
- [ ] Replace Korean outfit Unsplash URL with `/outfit-korean.jpg`
- [ ] Replace Streetwear outfit Unsplash URL with `/outfit-streetwear.jpg`
- [ ] Replace Vintage outfit Unsplash URL with `/outfit-vintage.jpg`

### Task 2.2: Fix Spacing

- [ ] Hero section: Change `pt-20 pb-32` to `pt-12 pb-16 md:py-20`
- [ ] How It Works: Change `py-24` to `py-16 md:py-24`
- [ ] Value Prop: Change `py-24` to `py-16 md:py-24`
- [ ] Outfits section: Change `py-32` to `py-20`
- [ ] Marketplaces: Change `py-24` to `py-16 md:py-24`
- [ ] FAQ: Change `py-24` to `py-16 md:py-24`

### Task 2.3: Add Interactive FAQ

- [ ] Import `useState` and `ChevronDown` icon
- [ ] Create `FaqItem` component at bottom of file
- [ ] Add state management for open/close
- [ ] Add smooth animation classes
- [ ] Replace static FAQ with interactive version

### Task 2.4: Redesign Footer

- [ ] Change background to dark (`bg-editorial-text text-editorial-white`)
- [ ] Add newsletter signup section
- [ ] Add social media icons (Instagram, Twitter)
- [ ] Restructure footer grid layout
- [ ] Add hover effects

### Task 2.5: Add Content Enhancements

- [ ] Add "Trusted by X users" section in hero
- [ ] Add trending aesthetics marquee/ticker
- [ ] Add hover effects to outfit cards
- [ ] Add ArrowRight icon to outfit cards

### Task 2.6: Add Marquee Animation

- [ ] Update `tailwind.config.js` with keyframes
- [ ] Add animation definition
- [ ] Test marquee scrolling

## Phase 3: Testing 🧪

- [ ] Restart Next.js dev server
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Test navigation links scroll
- [ ] Test FAQ accordion expand/collapse
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify all images load correctly
- [ ] Check hover states on all interactive elements

## Phase 4: User Review 👀

- [ ] User reviews design
- [ ] User reviews functionality
- [ ] User approves changes
- [ ] User gives permission to push to GitHub

## Phase 5: Deployment 🚀

- [ ] Git add changes
- [ ] Git commit with descriptive message
- [ ] Git push to main (ONLY with user permission)
- [ ] Monitor Vercel deployment
- [ ] Verify live site

## Notes

- **DO NOT PUSH** without explicit user permission
- Test everything locally first
- User is viewing on local dev server
- Images are already in `/public` folder
