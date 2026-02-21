# Feature Spec: 004 — Pledge Mechanic + Idea Detail Page

## Summary

Build the idea detail page (`/ideas/[id]`) and the pledge mechanic. Authenticated users can
pledge a monthly amount to an idea. Pledges are tracked (not charged — no Stripe yet). The
board updates to reflect new pledge totals in real time.

## Routes

- `app/ideas/[id]/page.tsx` — server component, idea detail + pledge form
- `app/ideas/[id]/actions.ts` — server actions: pledgeIdea, unpledgeIdea

## Idea Detail Page (`/ideas/[id]`)

### Header
- Back link: `← the board` (links to /ideas)
- Nav: same pattern (auth state)

### Idea content
- Title (large, bold)
- Status badge
- Full description
- "the problem:" section with problem text
- "submitter asks $X/mo to maintain and host this"

### Pledge panel (right side or below on mobile)

**If not authenticated:**
- "sign in to pledge →" button → `/auth?next=/ideas/[id]`

**If authenticated + not yet pledged:**
- Number input: "pledge $[amount]/mo" (default $50, min $25, max $500, step $25)
- Submit button: "pledge →"
- Helper text: "no charges yet — this is a commitment, not a payment"

**If authenticated + already pledged:**
- Shows: "you're pledged at $X/mo"
- "withdraw pledge" button (danger/muted styling)
- Helper text: "withdrawing removes your commitment"

### Pledge summary bar
Always visible:
- "$Y/mo pledged total from N sponsors"
- Progress bar toward threshold ($1,000/mo default)
- "X% of the way to forming a cell"

## Server Actions

### pledgeIdea(ideaId, amount)
1. auth check — return error if no user
2. validate amount: integer, 25 ≤ amount ≤ 500
3. upsert into pledges (unique constraint = update if exists)
4. revalidatePath("/ideas") + revalidatePath(`/ideas/${ideaId}`)
5. return success

### unpledgeIdea(ideaId)
1. auth check
2. delete from pledges where idea_id = ideaId and user_id = user.id
3. revalidatePath both paths
4. return success

## Security

- All mutations require auth (server-side check, not just UI gate)
- pledge amount validated server-side: integer, 25–500
- user can only pledge once per idea (upsert handles this)
- user can only withdraw their own pledge (user_id check)

## Acceptance Criteria

- [ ] `/ideas/[id]` loads for all ideas
- [ ] `/ideas/bogus-id` returns 404 (not 500)
- [ ] anon user sees "sign in to pledge" button
- [ ] authenticated user sees pledge form
- [ ] submitting pledge updates total on board and detail page
- [ ] already-pledged user sees current pledge amount + withdraw button
- [ ] withdraw removes pledge and updates total
- [ ] progress bar shows % toward $1,000 threshold
- [ ] idea cards on `/ideas` now link to `/ideas/[id]` (they already do from 002)
- [ ] `./dev/health` returns ok
