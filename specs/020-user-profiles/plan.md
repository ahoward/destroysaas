# Plan: 020 — Public User Profiles

## Files

| File | Action |
|------|--------|
| `supabase/migrations/008_profiles.sql` | create — profiles table + RLS |
| `app/profile/[id]/page.tsx` | create — public profile page |
| `app/dashboard/profile/page.tsx` | create — edit profile form |
| `app/dashboard/profile/actions.ts` | create — updateProfile server action |
| `app/dashboard/page.tsx` | modify — add "edit profile" link |

## Migration

Apply via Management API with SUPABASE_ACCESS_TOKEN.

## Notes

- Profile is optional — pages work with just email prefix as fallback
- Upsert pattern for first-time profile creation
- Public profile shows ideas but NOT pledge amounts (privacy)
