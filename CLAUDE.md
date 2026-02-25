# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LaunchSpace is the company website for LaunchSpace LLC ([launchspace.org](https://launchspace.org)), built with React 19 + TypeScript using Create React App. It deploys to Vercel with serverless API functions for email/newsletter management via Brevo (formerly Sendinblue).

## Commands

- `npm start` — Dev server at localhost:3000
- `npm run build` — Production build to `build/`
- `npm test` — Jest test runner (interactive watch mode)
- `npm test -- --watchAll=false` — Run tests once (CI mode)
- `npm test -- --testPathPattern=<filename>` — Run a single test file

## Architecture

### Frontend (src/)

Single-page app using React Router DOM v7 with client-side routing. All components live flat in `src/` — each component has a co-located `.css` file (plain CSS, no preprocessor or CSS-in-JS).

**App.tsx** is the root: wraps everything in `<Router>`, defines all routes, renders the navbar and footer on every page, and manages the flashlight cursor effect + scroll-based nav visibility.

**Routes:**
- `/` — Hero section (inline in App.tsx, not a separate component)
- `/apps` — Apps.tsx: Product showcase with search and category filtering
- `/career` — Career.tsx: Job listings with tabbed interface
- `/contact` — Contact.tsx: Contact form with client-side validation
- `/unsubscribe` — UnsubscribePage.tsx: Newsletter unsubscribe flow

**Shared components:** Footer.tsx (includes newsletter signup form), LoadingScreen.tsx (2s splash on initial load), VideoBackground.tsx (MP4/WebM background for non-home pages), BubbleBackground.tsx (animated bubble effects).

### Backend (api/)

Vercel serverless functions (plain Node.js, not TypeScript). All use the Brevo API for email operations.

- `api/send-email.js` — Contact form submission (POST, 10s timeout configured in vercel.json)
- `api/subscribe.js` — Newsletter subscription (POST, checks for duplicates, sends welcome email)
- `api/unsubscribe.js` — Newsletter unsubscribe (GET/POST, validates status before removal)

All API functions handle CORS preflight (OPTIONS) and return JSON responses.

### Environment Variables

- `BREVO_API_KEY` — Required for all email functionality
- `BREVO_LIST_ID` — Mailing list ID (hardcoded as `6` in subscribe/unsubscribe functions)

For local dev, create `.env.local` with `BREVO_API_KEY=...`. For production, set in Vercel dashboard.

## Key Patterns

- **No global state management** — All state is local via `useState` hooks
- **Component-scoped CSS** — Each component has its own `.css` file imported directly
- **Responsive design** — Mobile breakpoints at 480px, 768px, 1200px; mobile hamburger menu auto-closes on resize past 768px
- **Home page vs other pages** — Home page uses dark background with flashlight effect; other pages use video background with `black-bg` body class
