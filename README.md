# Fabian Musau Portfolio

A modern developer portfolio built with React, TypeScript, Tailwind CSS, and Supabase Edge Functions. This project showcases Fabian Musau's experience, projects, skills, certifications, and contact form with animated page sections, interactive UI components, and a chat assistant backend.

## Overview

This repository contains a full-screen portfolio landing page with:
- Animated hero section with parallax effects and developer branding
- Project case studies with live/demo and GitHub links
- Skills, certifications, and thinking sections
- Contact form with toast notifications
- Custom chat assistant backend powered by a Supabase Edge Function
- Responsive UI and dark/light-ready styling using Tailwind CSS

## Key Features

- **Hero section** with animated background, developer photo, and call-to-actions
- **Project showcase** with case-study cards, tech stack tags, and live/demo links
- **Contact section** with a form and quick access to email, GitHub, and LinkedIn
- **Custom components** powered by shadcn UI and Radix primitives
- **Page transitions** and motion using Framer Motion
- **React Router** handling the home route and 404 page
- **Supabase Edge Function** for AI chat integration with the Gemini API
- **Tailwind CSS** theming and utility-first styling
- **Vite** development server and production build tooling

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Supabase Edge Functions (Deno)
- Gemini AI Chat API
- shadcn/ui design system
- Radix UI primitives
- React Query

## Repository Structure

```
  public/                  # Static files and assets
  src/
    assets/                # Images used in the portfolio
    components/            # Reusable UI components and sections
      sections/            # Page sections used on the landing page
      ui/                  # Design-system components
    hooks/                 # Custom React hooks
    integrations/          # Third-party integration clients
    lib/                   # Utility helpers
    pages/                 # Top-level route pages
    test/                  # Example tests and setup
  supabase/
    config.toml            # Supabase project configuration
    functions/chat/        # Edge function for AI chat back-end
  package.json             # Project dependencies and scripts
  tsconfig.json            # TypeScript configuration
  vite.config.ts           # Vite configuration and aliasing
  tailwind.config.ts       # Tailwind theme and content config
```

## Getting Started

### Prerequisites

- Node.js 18+ or newer
- npm or pnpm installed
- Supabase CLI if you want to deploy the edge function

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local development URL printed by Vite, typically `http://localhost:8080`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```



## Supabase Edge Function

The chat assistant backend is implemented in `supabase/functions/chat/index.ts`:
- Uses Deno standard server API
- Accepts chat message payloads from the frontend
- Forwards messages to the  AI gateway
- Returns streamed responses to the client
- Handles CORS, rate limit errors, and API credit errors

## Important Files

- `src/App.tsx` — Application root, React Query provider, routing, and global providers
- `src/pages/Index.tsx` — Landing page composition with hero, skills, projects, and contact sections
- `src/components/sections/Hero.tsx` — Animated portfolio introduction section
- `src/components/sections/Projects.tsx` — Project showcase and case study cards
- `src/components/sections/Contact.tsx` — Contact form with toast notifications
- `vite.config.ts` — Vite config, alias setup, and dev plugin
- `tailwind.config.ts` — Tailwind CSS theme extension and animation settings

## Design & UI

The UI uses a combination of:
- Tailwind CSS for layout and styling
- shadcn UI and Radix for accessible components
- Framer Motion for animations and section reveals
- Custom utility classes and gradients for modern look-and-feel



### deployment steps

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your static host.
3. Deploy the Supabase function from `supabase/functions/chat` 

## Notes

- The contact form in the UI currently uses a local simulated submission with a toast notification.
- The project includes a `404` route for unknown paths.
- `vite.config.ts` enables `lovable-tagger` in development for component tagging and debugging.



