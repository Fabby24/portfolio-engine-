
# Plan: Add SecureLab WiFi Project to Projects Section

## Changes

**Modify: `src/components/sections/Projects.tsx`**

1. Update the `Project` type to add optional `teamSize` and `role` fields
2. Generate a placeholder screenshot asset (`src/assets/project-securelab.jpg`)
3. Add the SecureLab project to the `projects` array with all case study data:
   - Status: "Completed"
   - Tech stack: React, Tailwind CSS, Supabase, SMS API
   - Team project badge showing "Team of 4"
4. Display a "Team Project" badge on the card when `teamSize` is present (small collaborative indicator near the status badge)
5. Show the developer's role beneath the project title when provided

## Data

```
title: "SecureLab WiFi Access Control"
status: "Completed"
teamSize: 4
role: "Full-Stack Developer (API Integration, SMS Alerts, Database)"
problem: "Unauthorized devices connecting to shared WiFi networks..."
techStack: ["React", "Tailwind CSS", "Supabase", "SMS API"]
github: "https://github.com/fabianmusau"
```

## Files Changed

| File | Change |
|------|--------|
| `src/assets/project-securelab.jpg` | Generated placeholder screenshot |
| `src/components/sections/Projects.tsx` | Add teamSize/role fields, SecureLab project entry, team badge UI |
