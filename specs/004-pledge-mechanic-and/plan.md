# Plan: 004 — Pledge Mechanic + Idea Detail Page

## Files

| File | Action |
|------|--------|
| `app/ideas/[id]/page.tsx` | create — server component, idea detail + pledge panel |
| `app/ideas/[id]/actions.ts` | create — pledgeIdea + unpledgeIdea server actions |

## Approach

Single dynamic route. Server component fetches:
1. Idea by ID from `idea_board` view (includes total_pledged + pledge_count)
2. Current user's pledge (if authenticated) from `pledges` table

The pledge form and withdraw button are client components (`"use client"`) that call server actions.

## 404 handling

If idea not found: `notFound()` from `next/navigation` — renders the app's 404 page cleanly.

## Progress bar

`(total_pledged / 1000) * 100` clamped to 100. Pure CSS width percentage.

## Threshold

Default $1,000/mo. Hardcoded for now. Future: configurable per idea.
