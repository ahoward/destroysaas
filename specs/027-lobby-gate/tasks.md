# Tasks: Soft Gate — Lobby Dashboard + Cabal Application

- [ ] 1. Create migration 013_cabal_applications.sql
- [ ] 2. Add is_inner() to lib/groups.ts
- [ ] 3. Gate app/dashboard/page.tsx (redirect non-inner to /lobby)
- [ ] 4. Gate app/ideas/new/page.tsx (redirect non-inner to /lobby)
- [ ] 5. Gate server actions in app/ideas/new/actions.ts
- [ ] 6. Gate server actions in app/ideas/[id]/actions.ts
- [ ] 7. Update app/ideas/[id]/page.tsx (pass is_inner to components)
- [ ] 8. Update app/ideas/[id]/pledge_panel.tsx (lobby CTA when not inner)
- [ ] 9. Create app/lobby/page.tsx (lobby dashboard)
- [ ] 10. Create app/lobby/apply/page.tsx + actions.ts (application form)
- [ ] 11. Create app/admin/applications/page.tsx + actions.ts (admin review)
- [ ] 12. Update app/components/nav.tsx (lobby link for non-inner)
- [ ] 13. Update app/page.tsx (landing CTAs)
- [ ] 14. Update app/admin/page.tsx (applications link)
- [ ] 15. TypeScript check (npx tsc --noEmit)
- [ ] 16. Apply migration to production
