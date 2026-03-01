-- migration: 015_cabal_posts
-- cabal discussion posts + replies

create table if not exists cabal_posts (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists cabal_replies (
  id           uuid primary key default gen_random_uuid(),
  post_id      uuid not null references cabal_posts(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  display_name text not null default '',
  body         text not null,
  created_at   timestamptz not null default now()
);

alter table cabal_posts enable row level security;
create policy "cabal_posts_public_read" on cabal_posts for select using (true);
create policy "cabal_posts_auth_insert" on cabal_posts for insert with check (auth.uid() = created_by);
create policy "cabal_posts_owner_update" on cabal_posts for update using (auth.uid() = created_by);
create policy "cabal_posts_owner_delete" on cabal_posts for delete using (auth.uid() = created_by);

alter table cabal_replies enable row level security;
create policy "cabal_replies_public_read" on cabal_replies for select using (true);
create policy "cabal_replies_auth_insert" on cabal_replies for insert with check (auth.uid() = user_id);
create policy "cabal_replies_owner_delete" on cabal_replies for delete using (auth.uid() = user_id);
