# Tasks: 001 — Landing Page + Brand

## Checklist

- [ ] **T1** read current `app/page.tsx` and understand existing auth pattern
- [ ] **T2** read current `app/layout.tsx` to understand global styles/fonts
- [ ] **T3** read `app/auth/` to understand sign-out pattern (need to reuse it in nav)
- [ ] **T4** read `lib/supabase/server.ts` to confirm server client import path
- [ ] **T5** rewrite `app/page.tsx` — nav section (logo + auth state)
- [ ] **T6** rewrite `app/page.tsx` — hero section (headline + subtitle)
- [ ] **T7** rewrite `app/page.tsx` — problem statement paragraph
- [ ] **T8** rewrite `app/page.tsx` — 3-step section (propose/pledge/own)
- [ ] **T9** rewrite `app/page.tsx` — CTA section (submit an idea + browse)
- [ ] **T10** rewrite `app/page.tsx` — footer (tagline + github/docs links)
- [ ] **T11** run `./dev/test` (tsc + next build) — must pass clean
- [ ] **T12** commit and push to branch `001-landing-page-and-brand`
- [ ] **T13** deploy to vercel: `vercel deploy --prod --yes`
- [ ] **T14** run `./dev/health` — must return `{"status":"ok"}`
- [ ] **T15** verify in browser: anonymous view shows "sign in" in nav
- [ ] **T16** verify in browser: no console errors

## Definition of Done

All tasks checked. `./dev/health` returns ok. Browser screenshot confirms landing page
renders with hero, 3 steps, CTA, and correct auth state in nav.
