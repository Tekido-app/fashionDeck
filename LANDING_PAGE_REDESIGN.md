# FashionDeck Landing Page Redesign - Implementation Plan

## Current Status

- ✅ Images uploaded by user (4 files)
- ✅ Images copied to `apps/web/public/`
- ❌ Page still showing Unsplash images instead of local images
- ❌ Missing interactive FAQ accordion
- ❌ Missing improved footer
- ❌ Spacing still too large

## Issues to Fix

### 1. Image References

**Problem**: `page.tsx` currently uses Unsplash URLs instead of local `/public` images
**Solution**: Update all Image src attributes to use local paths

Current:

```tsx
src = "https://images.unsplash.com/photo-...";
```

Should be:

```tsx
src = "/hero-collage.jpg";
src = "/outfit-korean.jpg";
src = "/outfit-streetwear.jpg";
src = "/outfit-vintage.jpg";
```

### 2. Navigation Links

**Problem**: Anchor links may not scroll smoothly
**Solution**: Ensure proper `id` attributes and smooth scroll behavior

### 3. Spacing

**Problem**: Too much vertical spacing between sections
**Current**: `py-24`, `py-32`
**Target**: `py-16`, `py-20`

### 4. FAQ Section

**Problem**: Plain text, not interactive
**Solution**: Implement accordion with useState

### 5. Footer

**Problem**: Basic footer design
**Solution**: Redesign to "fat footer" with newsletter, social links

### 6. Content

**Problem**: Page feels sparse
**Solution**: Add:

- Social proof section
- Trending aesthetics ticker/marquee
- Better CTA sections

## Implementation Steps

### Step 1: Verify Image Files

- [x] Check `apps/web/public/` contains all 4 images
- [x] Verify file names match expected names

### Step 2: Update page.tsx - Images Only

- [ ] Replace hero image URL with `/hero-collage.jpg`
- [ ] Replace outfit card 1 with `/outfit-korean.jpg`
- [ ] Replace outfit card 2 with `/outfit-streetwear.jpg`
- [ ] Replace outfit card 3 with `/outfit-vintage.jpg`

### Step 3: Reduce Spacing

- [ ] Change all `py-32` to `py-20`
- [ ] Change all `py-24` to `py-16`
- [ ] Reduce gap sizes in grids

### Step 4: Add Interactive FAQ

- [ ] Create `FaqItem` component with useState
- [ ] Add ChevronDown icon
- [ ] Implement smooth expand/collapse animation

### Step 5: Redesign Footer

- [ ] Add newsletter signup section
- [ ] Add social media links (Instagram, Twitter)
- [ ] Restructure footer columns
- [ ] Change background to dark (editorial-text)

### Step 6: Add Content Enhancements

- [ ] Add "Trusted by X users" social proof
- [ ] Add trending aesthetics marquee
- [ ] Add marquee animation to tailwind.config.js

### Step 7: Test Locally

- [ ] Restart dev server
- [ ] Clear browser cache
- [ ] Test all navigation links
- [ ] Test FAQ accordion
- [ ] Test responsive design
- [ ] Verify all images load

### Step 8: Final Review (Before Push)

- [ ] User approval on design
- [ ] User approval on functionality
- [ ] User gives explicit permission to push

## Files to Modify

1. `apps/web/src/app/page.tsx` - Main landing page
2. `apps/web/tailwind.config.js` - Add marquee animation
3. `apps/web/src/app/globals.css` - (if needed for custom styles)

## Files Already Created

- ✅ `apps/web/public/hero-collage.jpg`
- ✅ `apps/web/public/outfit-korean.jpg`
- ✅ `apps/web/public/outfit-streetwear.jpg`
- ✅ `apps/web/public/outfit-vintage.jpg`
- ✅ `apps/web/src/app/app/page.tsx` (functional app route)

## Expected Outcome

A clean, editorial-style landing page with:

- Real uploaded images (not Unsplash)
- Tighter, professional spacing
- Interactive FAQ accordion
- Premium dark footer
- Social proof and content richness
- Smooth navigation
- Responsive design
