# Feature Spec: 015 — Idea Categories

## Summary

Add categories to ideas so users can browse by type (e.g., "communication",
"project management", "analytics", "devtools", "finance"). Categories are
predefined (not user-created) to keep things clean.

## Database

Add `category` column to ideas table:

```sql
alter table ideas add column if not exists category text not null default 'other'
  check (category in ('communication','project-management','analytics','devtools','finance','marketing','hr','operations','other'));
```

Apply via Management API.

## Changes

### Idea Submission Form (`/ideas/new`)
- Add category dropdown (required, default "other")
- Options: communication, project management, analytics, devtools, finance, marketing, hr, operations, other

### Idea Board (`/ideas`)
- Add category filter to IdeasFilter component
- Show category tag on each idea card

### Idea Detail (`/ideas/[id]`)
- Show category tag next to status badge

### idea_board View
The view includes `i.*` so the new column will be included automatically.

## Acceptance Criteria

- [ ] New ideas require a category
- [ ] Ideas board can be filtered by category
- [ ] Category shows on idea cards and detail page
- [ ] Existing ideas default to "other"
- [ ] `./dev/health` returns ok
