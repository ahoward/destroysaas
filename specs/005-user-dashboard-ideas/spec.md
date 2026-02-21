# Feature Spec: 005 — User Dashboard

## Summary

Build `/dashboard` — an authenticated view showing a user's submitted ideas and active pledges.
Gives users a single place to track what they've proposed and what they've committed money to.

## Auth Gate

Unauthenticated users are redirected to `/auth?next=/dashboard`.

## Route

`app/dashboard/page.tsx` — server component

## Sections

### Header
- Nav (same pattern)
- Title: "your dashboard"
- Subtitle: user's email

### My Ideas

Fetches `ideas` where `created_by = user.id`, ordered by `created_at DESC`.

Each row shows:
- Title (links to `/ideas/[id]`)
- Status badge
- Total pledged (from `idea_board` view)
- Pledge count
- "view →" link

Empty state: "you haven't submitted any ideas yet. [submit one →](/ideas/new)"

### My Pledges

Fetches all pledges for the current user, joined with idea title and total_pledged.

Each row shows:
- Idea title (links to `/ideas/[id]`)
- "you pledged $X/mo"
- Total pledged across all sponsors
- Status badge
- "withdraw" button → calls `unpledgeIdea` server action (reuse from 004)

Empty state: "you haven't pledged to any ideas yet. [browse the board →](/ideas)"

### Monthly Commitment Summary

At top of pledges section:
- "you're committed to $Y/mo total across N ideas"
- This is the sum of all active pledges

## Acceptance Criteria

- [ ] `/dashboard` redirects anon to `/auth?next=/dashboard`
- [ ] shows my submitted ideas with stats
- [ ] shows my active pledges with totals
- [ ] withdraw button works (reuses 004 action)
- [ ] monthly total is correct
- [ ] empty states render correctly
- [ ] nav link to /dashboard added to nav bar (when logged in)
- [ ] `./dev/health` returns ok
