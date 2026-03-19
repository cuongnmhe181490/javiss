# Javiss

Javiss is a production-oriented AI-powered healthy lifestyle web app scaffold built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and Supabase-ready persistence boundaries.

## What is included

- Pantry-first weekly meal planning
- Budget-aware weekly meal planning
- Shopping list aggregation and pantry reconciliation
- Equipment-aware weekly workout planning
- Streak and tree-growth gamification dashboard
- Onboarding, profile, pantry, and settings flows
- Supabase auth and database scaffold with SQL schema and RLS
- Deterministic mock generators behind typed service boundaries

## Architecture

- `app/`: route composition
- `components/`: shared UI, marketing, dashboard, and layout primitives
- `features/`: domain UI modules
- `services/`: meal, pantry, shopping-list, and workout logic
- `lib/`: shared app config, demo state, validation, and Supabase helpers
- `types/`: app-facing domain contracts
- `data/`: mock user, recipe catalog, and exercise catalog
- `supabase/`: schema and policy SQL
- `docs/architecture.md`: product and implementation plan

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

## Environment

Create local environment variables from `.env.example`.

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

If Supabase credentials are not configured, the app still runs using deterministic mock data.

## Current status

The scaffold currently ships with:

- Working route map for landing, auth, onboarding, dashboard, pantry, meals, shopping, workouts, profile, and settings
- Passing lint, typecheck, unit tests, and production build
- A clean provider boundary for future AI integration without turning the app into an unstructured chat demo
