-- Create waitlist table
create table if not exists public.waitlist (
  id         uuid         primary key default gen_random_uuid(),
  email      text         not null unique,
  created_at timestamptz  not null default now()
);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Allow anyone (anon + authenticated) to insert their own email
create policy "public can insert waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);

-- No select policy → reads are restricted to service role only
