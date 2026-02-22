# Tasks: 015 — Idea Categories

## Checklist

- [ ] **T1** write `supabase/migrations/006_categories.sql`
- [ ] **T2** apply migration via Management API:
  - `curl -X POST https://api.supabase.com/v1/projects/bjaejvgoifgdanwvglnv/database/query -H "Authorization: Bearer sbp_7053248c464aee5969ede7606a8ec1e45fd5339f" -H "Content-Type: application/json" -d '{"query": "<SQL>"}'`
- [ ] **T3** modify idea submission form (`app/ideas/new/`):
  - add category select dropdown to form
  - update server action to accept + validate category
  - insert category into ideas row
- [ ] **T4** modify `app/ideas/ideas_filter.tsx`:
  - add IdeaRow type to include `category` field
  - add category filter dropdown (alongside status and sort)
  - filter ideas by selected category
- [ ] **T5** modify `app/ideas/[id]/page.tsx`:
  - show category tag next to status badge in the header
  - use a distinct color (e.g., blue-500 border)
- [ ] **T6** run `./dev/post_flight` — must pass
- [ ] **T7** commit + push + merge to main
- [ ] **T8** deploy: `vercel deploy --prod --yes`
- [ ] **T9** run `./dev/health` — must return ok

## Definition of Done

Ideas have categories. Submission form includes category select. Board can filter by category.
Category tag visible on cards and detail page.
