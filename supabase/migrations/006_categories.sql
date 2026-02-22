alter table ideas add column if not exists category text not null default 'other'
  check (category in ('communication','project-management','analytics','devtools','finance','marketing','hr','operations','other'));
