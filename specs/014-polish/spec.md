# Feature Spec: 014 — Polish & UX Improvements

## Summary

Quality-of-life improvements: custom 404 page, loading skeletons, password reset
flow, and a footer component shared across all pages.

## Custom 404 Page

- `app/not-found.tsx` — branded 404 with link back to home and ideas
- Dark theme, minimal, "this page doesn't exist" messaging

## Shared Footer

- Create `app/components/footer.tsx` — shared footer component
- Links: home, ideas, about, dev cells, github
- "the code is free. the network is the value." tagline
- Add to all pages (or layout.tsx)

## Password Reset

- Check if Supabase auth already handles /auth?mode=forgot
- If not: add "forgot password?" link on /auth page
- Use `supabase.auth.resetPasswordForEmail(email)` 
- Confirmation message: "check your email for a reset link"

## Loading States

- `app/ideas/loading.tsx` — skeleton loading for ideas board
- `app/ideas/[id]/loading.tsx` — skeleton for idea detail
- Simple gray pulsing boxes matching the layout

## Acceptance Criteria

- [ ] 404 page renders with branding
- [ ] Footer appears on all pages
- [ ] Password reset flow works
- [ ] Loading skeletons show during navigation
- [ ] `./dev/health` returns ok
