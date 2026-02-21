# Plan: 005 — User Dashboard

## Files

| File | Action |
|------|--------|
| `app/dashboard/page.tsx` | create — server component, auth gate + full dashboard |

## Approach

Single server component. Fetches three things in parallel via Promise.all:
1. User's submitted ideas (from idea_board view filtered by created_by)
2. User's pledges joined with idea data
3. Pledge total sum

Reuse `unpledgeIdea` server action from `app/ideas/[id]/actions.ts` for the withdraw button.
Nav update: add "dashboard" link when user is authenticated in the nav.

Note: nav link needs to be added to `app/page.tsx` and `app/ideas/page.tsx` nav sections.
