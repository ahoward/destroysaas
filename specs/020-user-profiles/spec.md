# Feature Spec: 020 — Public User Profiles

## Summary

Public profile pages showing a user's ideas, pledges, and activity.
Builds community trust and accountability.

## Database

```sql
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  bio         text,
  website     text,
  created_at  timestamptz not null default now()
);

alter table profiles enable row level security;
create policy "profiles_public_read" on profiles for select using (true);
create policy "profiles_owner_upsert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_owner_update" on profiles for update using (auth.uid() = id);
```

## Routes

- `app/profile/[id]/page.tsx` — public profile page
- `app/dashboard/profile/page.tsx` — edit your profile (name, bio, website)

## Profile Page

- Display name (or email prefix as fallback)
- Bio (optional)
- Website link (optional)
- Ideas submitted (list with status + pledges)
- Member since date
- Total upvotes received

## Edit Profile

- Form on dashboard: display name, bio, website
- Save updates to profiles table
- Upsert on first save

## Acceptance Criteria

- [ ] /profile/[id] shows public profile
- [ ] Dashboard has "edit profile" section
- [ ] Profiles table created with RLS
- [ ] `./dev/health` returns ok
