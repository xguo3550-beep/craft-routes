# Craft Routes — Workshop Marketplace

A responsive marketplace for international travelers to book cultural workshops in **Dali, Yunnan** and **Sichuan**, China.

Built with **Next.js 13** (App Router), **Tailwind CSS**, **Supabase**, and **Stripe**.

> **Note:** For Next.js 15+, upgrade to Node.js 20+. The project builds on Node 18.12 with Next.js 13.5.7.

## Features

- Browse workshops by region (Dali / Sichuan)
- Workshop detail pages with gallery, host info, and upcoming sessions
- Full booking flow with guest details and Stripe Checkout
- Mock data fallback when Supabase is not configured (works out of the box)
- Mobile-responsive design

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without env vars, the app uses built-in mock workshop data and skips Stripe (redirects straight to success).

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (for bookings API) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_APP_URL` | App URL (e.g. `http://localhost:3000`) |

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor
3. Run `supabase/seed.sql` to populate sample workshops
4. Add credentials to `.env.local`

## Stripe setup

1. Create products optionally, or use dynamic `price_data` (already implemented)
2. Add API keys to `.env.local`
3. For local webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Project structure

```
src/
  app/              # Pages & API routes
  components/       # UI components
  lib/              # Supabase, Stripe, data layer
  types/            # TypeScript types
supabase/
  migrations/       # Database schema
  seed.sql          # Sample data
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
