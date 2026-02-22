# Tasks: 014 — Polish & UX Improvements

## Checklist

- [ ] **T1** create `app/not-found.tsx`:
  - dark theme, "this page doesn't exist" heading
  - link to home + link to ideas board
  - consistent with app branding
- [ ] **T2** create `app/components/footer.tsx`:
  - links: home, ideas, about, dev cells, github
  - tagline: "the code is free. the network is the value."
  - subtle, dark theme, small text
- [ ] **T3** modify `app/layout.tsx`:
  - import and render Footer below {children}
- [ ] **T4** create `app/ideas/loading.tsx`:
  - skeleton: search bar placeholder, 3 idea card placeholders
  - gray pulsing blocks (animate-pulse)
- [ ] **T5** create `app/ideas/[id]/loading.tsx`:
  - skeleton: title bar, description block, pledge bar, comments section
  - gray pulsing blocks
- [ ] **T6** modify `app/auth/page.tsx`:
  - add "forgot password?" link below password field
  - add forgotPassword server action or client-side handler
  - uses supabase.auth.resetPasswordForEmail(email)
  - show "check your email" confirmation message
- [ ] **T7** remove duplicate footer from individual pages if layout now has it
  - check app/page.tsx (landing), app/about/page.tsx — they may have inline footers
- [ ] **T8** run `./dev/post_flight` — must pass
- [ ] **T9** commit + push + merge to main
- [ ] **T10** deploy: `vercel deploy --prod --yes`
- [ ] **T11** run `./dev/health` — must return ok

## Definition of Done

404 page branded. Footer on all pages. Password reset works. Loading skeletons show.
