-- cabal_applications: users apply for inner circle access
create table if not exists cabal_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  name text not null,
  reason text not null,
  contribution text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'denied')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz default now() not null,
  unique(user_id)
);

alter table cabal_applications enable row level security;

create policy "users can read own application"
  on cabal_applications for select
  using (auth.uid() = user_id);

create policy "users can insert own application"
  on cabal_applications for insert
  with check (auth.uid() = user_id);
