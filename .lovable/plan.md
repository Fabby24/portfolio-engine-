

# Plan: Developer Photo in Hero + Scroll-to-Top Button

## 1. Developer Photo in Hero Section

**Modify: `src/components/sections/Hero.tsx`**
- Change the Hero layout from single-column (`max-w-3xl`) to a two-column split layout on desktop
- Left column: existing text content (headline, description, buttons, social links)
- Right column: developer photo in a styled container with:
  - Rounded border with a gradient ring (primary/accent colors)
  - Subtle floating animation
  - Glow/shadow effect behind the photo
  - Responsive: photo stacks above or below text on mobile
- Use a placeholder image path (`/developer-photo.jpg`) that the user can replace with their actual photo

## 2. Scroll-to-Top Arrow Button

**Modify: `src/pages/Index.tsx`** (or create a small component)
- Add a fixed-position "back to top" button (bottom-right, above the chatbot)
- Shows only after user scrolls past ~300px (using `window.scrollY` listener)
- Animated entrance/exit with Framer Motion (`AnimatePresence`)
- Clicking scrolls smoothly to top (`window.scrollTo({ top: 0, behavior: 'smooth' })`)
- Styled as a circular button with an `ArrowUp` icon, matching the portfolio's design system

## Files Changed

| File | Change |
|------|--------|
| `src/components/sections/Hero.tsx` | Two-column layout with developer photo |
| `src/pages/Index.tsx` | Add scroll-to-top button component |

