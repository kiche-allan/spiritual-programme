create table public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  week int not null check (week > 0),
  day int not null check (day between 1 and 7),
  completed_at timestamptz not null default now(),
  primary key (user_id, week, day)
);
alter table public.progress enable row level security;
create policy "own rows select" on public.progress for select using (auth.uid() = user_id);
create policy "own rows insert" on public.progress for insert with check (auth.uid() = user_id);
create policy "own rows delete" on public.progress for delete using (auth.uid() = user_id);
