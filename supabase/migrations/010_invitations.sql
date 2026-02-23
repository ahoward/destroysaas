-- migration: 010_invitations
-- description: invitation system for personalized invite links with group auto-join and tracking
--
-- apply via supabase management API:
--   curl -X POST https://api.supabase.com/v1/projects/bjaejvgoifgdanwvglnv/database/query \
--     -H "Authorization: Bearer $JWT" \
--     -H "Content-Type: application/json" \
--     -d '{"query": "<contents of this file>"}'

create table invitations (
  id uuid primary key default gen_random_uuid(),
  token uuid not null unique default gen_random_uuid(),
  created_by uuid not null references auth.users(id) on delete cascade,
  recipient_name text,
  recipient_email text,
  group_names text[] not null default '{}',
  redirect_path text not null default '/',
  note text,
  view_count integer not null default 0,
  viewed_at timestamptz,
  accepted_at timestamptz,
  accepted_by uuid references auth.users(id),
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

alter table invitations enable row level security;

-- public select: landing page must read invitations pre-auth
create policy "invitations_public_read" on invitations
  for select using (true);

-- all mutations (create, update, delete) go through service role client
-- no insert/update/delete policies needed for normal users
