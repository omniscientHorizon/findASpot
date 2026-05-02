# SpotFinder

Real-time crowdsourced study spot availability for Schaffer Library at Union College.

**Built at HackUnion 2026.**

## The Problem

Every Union student has wasted 20–60 minutes wandering Schaffer Library looking for an open spot during finals. That's hours of lost study time across campus every week.

## The Solution

SpotFinder is a mobile-first web app that shows live availability of every study spot across all 4 floors of Schaffer Library. Students mark spots as open or taken, and the map updates in real time for everyone.

## How It Works

1. Open SpotFinder on your phone or laptop
2. Pick a floor — see which spots are open (green) or taken (red)
3. Sitting down or leaving? Tap a spot and mark it
4. Everyone sees the update instantly

## What's Mapped

- **206 study spots** across Basement, 1st, 2nd, and 3rd floors
- Carrel desks, group tables, computer stations, study rooms, enclosed carrels
- Capacity and features (charging ports, whiteboards, TVs) for each spot

## Tech Stack

- **Next.js** — React framework, deployed on Vercel
- **Supabase** — Postgres database + Realtime subscriptions + Anonymous Auth
- **Tailwind CSS** — Styling

All spot updates broadcast in real time via Supabase Realtime. No login required — anonymous auth runs invisibly so anyone can contribute without friction.

## Running Locally

```bash
git clone https://github.com/omniscientHorizon/spotfinder.git
cd spotfinder
npm install
```

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Future Ideas

- Union SSO login (@union.edu)
- Historical heatmaps — busiest times per floor
- Expand to Wold, Nott Memorial, CS Spaces on Campus
- Bluetooth/WiFi proximity verification

## License

MIT
