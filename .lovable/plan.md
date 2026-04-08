

# Implementation Plan: Loading Screen, AI Chatbot, and GitHub Section

## Overview

Three features to add to Fabian Musau's portfolio:
1. Page loading screen with FM logo animation
2. AI-powered "Ask My Portfolio" chatbot using Lovable AI
3. GitHub activity section with contribution visualization

---

## 1. Loading Screen & Page Transitions

**New file: `src/components/LoadingScreen.tsx`**
- Full-screen overlay with the "FM." logo centered
- Logo animates with a scale-in + glow effect using Framer Motion
- Progress bar or pulsing animation beneath the logo
- After 2-second minimum display (or content loaded), fade out and reveal the page
- Uses `AnimatePresence` for smooth exit

**Modify: `src/pages/Index.tsx`**
- Add loading state with `useState` + `useEffect` (simulates load with timeout)
- Wrap page content in `motion.div` with fade-in after loading completes
- Sections stagger-animate on scroll (already partially done with `useInView`)

---

## 2. AI-Powered "Ask My Portfolio" Chatbot

**Requires: Lovable Cloud enabled** (LOVABLE_API_KEY is already available)

**New file: `supabase/functions/chat/index.ts`** (Edge Function)
- System prompt contains all of Fabian's portfolio data: skills, projects (EduBursary, Billing System, Bulk SMS), certifications, experience, philosophy
- Streams responses from Lovable AI Gateway (`google/gemini-3-flash-preview`)
- Handles 429/402 errors gracefully

**New file: `src/components/ChatBot.tsx`**
- Floating chat button (bottom-right corner) with FM-branded icon
- Expandable chat panel with:
  - Message history (user + assistant)
  - Markdown rendering via `react-markdown`
  - Streaming token-by-token display
  - Pre-built quick questions: "Why hire Fabian?", "What are his top skills?", "Tell me about EduBursary"
- Framer Motion for open/close animations
- Dark/light mode compatible styling

**Modify: `src/pages/Index.tsx`**
- Add `<ChatBot />` component (floating, always visible)

---

## 3. GitHub Activity Section

**New file: `src/components/sections/GitHub.tsx`**
- Uses GitHub's public API (no auth needed for public profiles)
- Fetches from `https://api.github.com/users/fabianmusau/repos?sort=updated&per_page=6`
- Three subsections:

**Contribution Graph (simulated)**
- CSS grid of colored squares mimicking GitHub's contribution heatmap
- Uses generated/mock data since the GitHub contributions API requires GraphQL auth
- Color intensity based on activity level, uses the warm orange palette

**Stats Cards**
- Total public repos, top languages, total stars
- Derived from the repos API response
- Animated counters on scroll

**Latest Repositories**
- Card grid showing 6 most recent repos
- Each card: repo name, description, language, stars, last updated
- Links to GitHub

**Modify: `src/pages/Index.tsx`**
- Add `<GitHub />` section between Projects and Thinking

---

## Technical Details

- **AI Gateway URL**: `https://ai.gateway.lovable.dev/v1/chat/completions`
- **Model**: `google/gemini-3-flash-preview`
- **Supabase function config**: Update `supabase/config.toml` to register the chat function with `verify_jwt = false` (public access)
- **GitHub API**: Public endpoints, no API key needed, rate-limited to 60 req/hr (sufficient for portfolio)
- **New dependency**: None required (react-markdown already installed)
- **Streaming**: SSE line-by-line parsing with proper `[DONE]` handling

