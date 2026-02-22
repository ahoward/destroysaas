# Tasks: 020 — Public User Profiles

## Checklist

- [x] **T1** write + apply `supabase/migrations/008_profiles.sql`
- [x] **T2** create `app/profile/[id]/page.tsx`:
  - fetch profile + ideas by this user from idea_board
  - display: name (or email prefix), bio, website, member since, ideas list
  - show total upvotes received across ideas
- [x] **T3** create `app/dashboard/profile/page.tsx` — edit form
- [x] **T4** create `app/dashboard/profile/actions.ts` — updateProfile (upsert)
- [x] **T5** modify `app/dashboard/page.tsx` — add "edit profile" link
- [x] **T6** run `./dev/post_flight` — must pass
- [ ] **T7** commit + push + merge to main
- [ ] **T8** deploy: `vercel deploy --prod --yes`
- [ ] **T9** run `./dev/health` — must return ok

## Definition of Done

Public profiles at /profile/[id]. Edit profile from dashboard. Profiles table with RLS.
