

# Plan: Enhanced Portfolio UX & Content Updates

## 1. Dark Mode as Default

**Modify: `src/components/sections/Navbar.tsx`**
- Initialize dark state to `true` and add `dark` class to `<html>` on first render via `useEffect`
- Users can still toggle to light mode

**Modify: `src/index.css`** (optional)
- Add a script in `index.html` `<head>` to set `class="dark"` on `<html>` before paint to prevent flash of light mode

---

## 2. Terminal-Style Loading Screen

**Modify: `src/components/LoadingScreen.tsx`**
- Replace the "Building the future" tagline with a terminal emulator UI
- Styled like Git Bash: dark background, green/amber monospace text, blinking cursor
- Lines appear sequentially with delays:
  ```
  > Initializing portfolio...
  > Loading components... [done]
  > Fetching GitHub data... [done]
  > Mounting sections... [done]
  > Compiling assets... [done]
  > Ready.
  ```
- Keep the FM logo above the terminal
- Keep the progress bar synced with terminal progress

---

## 3. Parallax Scrolling & Section Transitions

**Modify: Each section component** (Hero, About, Skills, Projects, etc.)
- Add parallax effect to background elements using Framer Motion's `useScroll` + `useTransform`
- Hero background image moves slower than content (classic parallax)
- Floating orbs in Hero get parallax depth
- Section headings slide in with staggered animations (already partially done, enhance with parallax offsets)

**Modify: `src/pages/Index.tsx`**
- Wrap sections with subtle fade/slide transitions triggered by scroll position

---

## 4. Enhanced Projects Section

**Modify: `src/components/sections/Projects.tsx`**
- Add a `screenshot` field to each project (placeholder image URLs)
- Display screenshot as a card header image with hover zoom effect
- Add "Live Demo" and "View Code" buttons styled with icons (`ExternalLink`, `Github`)
- Buttons are prominent, colored CTAs instead of small icons in the footer
- Update project data with demo/GitHub URLs

---

## 5. Certifications with View Links

**Modify: `src/components/sections/Certifications.tsx`**
- Add a `link` field to each certification
- Add a "View Certificate" button/link with `ExternalLink` icon
- Styled as a subtle link at the bottom of each cert card

---

## Files Changed

| File | Change |
|------|--------|
| `index.html` | Add dark mode initialization script |
| `src/components/LoadingScreen.tsx` | Terminal UI with sequential log lines |
| `src/components/sections/Navbar.tsx` | Default dark mode state |
| `src/components/sections/Projects.tsx` | Screenshots, Live Demo & View Code buttons |
| `src/components/sections/Certifications.tsx` | Certificate view links |
| `src/components/sections/Hero.tsx` | Parallax on background/orbs |
| `src/pages/Index.tsx` | Parallax scroll wrappers for sections |

