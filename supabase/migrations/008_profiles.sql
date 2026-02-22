-- migration: 008_profiles
-- applied: 2026-02-22

create table if not exists profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  bio          text,
  website      text,
  created_at   timestamptz not null default now()
);

alter table profiles enable row level security;
create policy "profiles_public_read" on profiles for select using (true);
create policy "profiles_owner_upsert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_owner_update" on profiles for update using (auth.uid() = id);
