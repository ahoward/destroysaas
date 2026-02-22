# Plan: 015 — Idea Categories

## Files

| File | Action |
|------|--------|
| `supabase/migrations/006_categories.sql` | create — add category column |
| `app/ideas/new/page.tsx` or `app/ideas/new/actions.ts` | modify — add category to form + action |
| `app/ideas/ideas_filter.tsx` | modify — add category filter dropdown |
| `app/ideas/[id]/page.tsx` | modify — show category tag |

## Migration

```sql
alter table ideas add column if not exists category text not null default 'other'
  check (category in ('communication','project-management','analytics','devtools','finance','marketing','hr','operations','other'));
```

Apply via Management API with SUPABASE_ACCESS_TOKEN.

## Notes

- Predefined categories only — no user-created categories
- idea_board view uses `i.*` so category flows through automatically
- Category filter in IdeasFilter is client-side (like status filter)
