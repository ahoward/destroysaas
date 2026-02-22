# Implementation Plan: Seed Data Strategy

## Approach

1. Add `is_seed` columns via Supabase migration
2. Create seed data file with realistic users, ideas, pledges, comments, upvotes
3. Build seed script that inserts via Supabase client
4. Build rollback script that deletes in dependency order
5. Add npm scripts

## Architecture

### Seed Data Structure

```
scripts/
  seed.ts          — main seed runner
  seed-rollback.ts — clean removal
  seed-data.ts     — all seed content (exported arrays)
```

### Data Volume

- 30 user profiles (diverse names, bios, business types)
- 11 ideas across verticals
- ~60-80 pledges (distributed across ideas, varied amounts $10-$200/mo)
- ~50-70 comments (2-8 per idea, from different users)
- ~100-150 upvotes (distributed realistically)

### Supabase Auth Consideration

Seed users need auth entries to have valid user IDs. Options:
1. Use `supabase.auth.admin.createUser()` with fake emails — creates auth + profile
2. Insert directly into profiles with generated UUIDs — but pledges/comments reference auth.users

**Decision**: Use admin API to create users with `email_confirm: true` and password `seed-password-not-real`. This creates proper auth entries that foreign keys can reference.

## Database Migration

Via Supabase Management API:

```sql
ALTER TABLE ideas ADD COLUMN IF NOT EXISTS is_seed boolean DEFAULT false;
ALTER TABLE pledges ADD COLUMN IF NOT EXISTS is_seed boolean DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_seed boolean DEFAULT false;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS is_seed boolean DEFAULT false;
ALTER TABLE upvotes ADD COLUMN IF NOT EXISTS is_seed boolean DEFAULT false;
```

## Rollback Order (respects foreign keys)

1. Delete upvotes WHERE is_seed = true
2. Delete comments WHERE is_seed = true
3. Delete pledges WHERE is_seed = true
4. Delete ideas WHERE is_seed = true
5. Delete profiles WHERE is_seed = true
6. Delete auth.users for seed user IDs (via admin API)
