# Plan: 014 — Polish & UX Improvements

## Files

| File | Action |
|------|--------|
| `app/not-found.tsx` | create — custom 404 page |
| `app/components/footer.tsx` | create — shared footer |
| `app/layout.tsx` | modify — add footer to layout |
| `app/ideas/loading.tsx` | create — skeleton loading |
| `app/ideas/[id]/loading.tsx` | create — skeleton loading |
| `app/auth/page.tsx` | modify — add forgot password link + handler |

## Notes

- Footer in layout.tsx means it appears on ALL pages automatically
- Loading.tsx files are Next.js conventions — shown automatically during navigation
- Forgot password uses supabase.auth.resetPasswordForEmail
- Keep skeletons simple — gray pulsing blocks, no complex animations
