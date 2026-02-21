# Tasks: 004 — Pledge Mechanic + Idea Detail Page

## Security/Logic Fixes (from Gemini review)

- [x] **S1** step validation: `amount % 25 === 0` server-side (not just client step=25)
- [x] **S2** status check: reject pledge if idea status is not `proposed` or `gaining_traction`
- [x] **S3** ideaId validation: check format + existence before DB ops, return structured error
- [x] **S4** error state in pledge UI: show inline error if action returns error
- [x] **S5** session expiry: if auth error from action → redirect to `/auth?next=/ideas/[id]`
- [x] **S6** self-pledge: creator cannot pledge to own idea (product decision: disallow)

## Checklist

- [x] **T1** create `app/ideas/[id]/actions.ts`:
  - `pledgeIdea(ideaId: string, amount: number)`: auth check, validate int 25-500, upsert pledges, revalidatePath
  - `unpledgeIdea(ideaId: string)`: auth check, delete own pledge, revalidatePath
- [x] **T2** create `app/ideas/[id]/page.tsx`:
  - fetch idea from idea_board view by id — if not found: call notFound()
  - fetch current user's existing pledge if authenticated
  - render: nav, back link, idea content, pledge panel, pledge summary bar
- [x] **T3** pledge panel client component (inline or separate file):
  - if anon: "sign in to pledge" link to /auth?next=/ideas/[id]
  - if auth + no pledge: amount input (min 25, max 500, step 25, default 50) + "pledge →" button calling pledgeIdea
  - if auth + pledged: show amount + "withdraw pledge" button calling unpledgeIdea
  - loading/pending state on buttons
- [x] **T4** pledge summary bar:
  - shows "$X/mo pledged from N sponsors"
  - progress bar: (total_pledged / 1000) * 100 clamped to 100%, red fill
  - label: "X% toward forming a cell ($1,000/mo threshold)"
- [x] **T5** 404: if idea not found, call notFound() (not throw error)
- [x] **T6** run `./dev/post_flight` — must pass
- [x] **T7** commit and push to 004-pledge-mechanic-and branch
- [x] **T8** deploy: `vercel deploy --prod --yes`
- [x] **T9** run `./dev/health` — must return ok

## Definition of Done

`/ideas/[id]` loads for all 3 seed ideas. Pledge panel shows correct state per auth.
Pledge + withdraw work. Progress bar shows. 404 on bad id.
