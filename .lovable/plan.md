

# Redesign: Premium Interactive Skills Section

## Overview
Replace the static percentage-bar skill cards with a proof-driven, interactive experience featuring reimagined skill cards, a "Tech Stack in Action" architecture visualization, and project-linked proof system.

## Architecture

### Data Structure
```typescript
type Skill = {
  name: string;
  icon: LucideIcon;
  category: "Frontend" | "Backend" | "Tools";
  proficiency: "Advanced" | "Proficient" | "Familiar";
  description: string;
  usedIn: string[];       // project names
  strengths: string[];    // key capabilities
};
```

### Component Breakdown
- **`Skills.tsx`** — Main section: header, filters, skill grid, and "Tech Stack in Action" viz
- **`SkillCard`** — Inline component: front face with icon/name/proficiency badge; hover expansion reveals description, project tags, and strengths
- **`TechStackFlow`** — Inline component: interactive node-based architecture diagram showing how technologies connect across projects

---

## 1. Skill Cards (Reimagined)

**Default state:**
- Lucide icon + skill name + proficiency badge ("Advanced" = green, "Proficient" = blue, "Familiar" = amber)
- Subtle gradient border glow on hover

**Hover/click expansion (AnimatePresence):**
- Short description of real-world usage
- "Used In" row: clickable project name badges (scroll to #projects on click)
- "Strengths" row: small tags for key capabilities
- Smooth height animation via `layout` + `AnimatePresence`

## 2. Animations
- Staggered fade+slide on scroll (`useInView`)
- `layout` prop on grid for smooth filter transitions
- Hover: scale(1.02), glow shadow, border-primary transition
- Filter switch: `AnimatePresence` with `layout` for smooth grid reflow

## 3. Filter System (Enhanced)
- Keep All / Frontend / Backend / Tools
- Active filter gets animated underline indicator (using `layoutId` for sliding pill)
- Grid uses `AnimatePresence` + `layout` for smooth card transitions when switching

## 4. "Tech Stack in Action" Visualization
Below the skills grid, add an interactive mini architecture diagram:
```
React → Node.js/Express → PostgreSQL/Supabase → SMS API
```
- Horizontal flow on desktop, vertical on mobile
- Each node: icon + name + role description on hover
- Animated connecting lines/arrows between nodes
- Nodes glow on hover, showing which projects used that tech
- Built with positioned divs + SVG lines + Framer Motion

## 5. Skill Data
14 skills mapped to real portfolio projects (EduBursary, Billing System, Bulk SMS, SecureLab) with descriptions and strengths.

## 6. Visual Design
- Dark/light mode support via existing Tailwind theme tokens
- Gradient accents matching portfolio palette (warm orange/accent)
- Rounded cards with `card-elevated` base + glow effects
- Clean typography hierarchy using existing `font-display` / `font-body`

## 7. Responsiveness
- 4-col grid on xl, 3-col lg, 2-col sm, 1-col mobile
- Architecture viz stacks vertically on mobile
- Hover interactions work as click-to-expand on touch devices

## Files Changed

| File | Change |
|------|--------|
| `src/components/sections/Skills.tsx` | Full rewrite: new data model, SkillCard component, TechStackFlow visualization, enhanced filters |

Single file change — all components are co-located in Skills.tsx for simplicity, matching the existing pattern in Projects.tsx.

