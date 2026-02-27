# Implementation Plan: Soft Gate — Lobby Dashboard + Cabal Application

## Migration

`013_cabal_applications.sql` — creates `cabal_applications` table with RLS.

## New helper

`is_inner(supabase, user)` in `lib/groups.ts` — returns true for cabal/admin/sudo/root.

## New pages

- `app/lobby/page.tsx` — lobby dashboard (stats + roadmap + activity + apply CTA)
- `app/lobby/apply/page.tsx` — application form (name, reason, contribution)
- `app/lobby/apply/actions.ts` — submitApplication server action
- `app/admin/applications/page.tsx` — admin review queue
- `app/admin/applications/actions.ts` — approveApplication, denyApplication

## Modified pages

- `app/dashboard/page.tsx` — redirect non-inner to /lobby
- `app/ideas/new/page.tsx` — redirect non-inner to /lobby
- `app/ideas/new/actions.ts` — gate submitIdea
- `app/ideas/[id]/actions.ts` — gate pledge/unpledge/upvote/comment
- `app/ideas/[id]/page.tsx` — pass is_inner to components
- `app/ideas/[id]/pledge_panel.tsx` — show lobby CTA when not inner
- `app/components/nav.tsx` — show lobby link for non-inner users
- `app/page.tsx` — update CTAs
- `app/admin/page.tsx` — add applications link
