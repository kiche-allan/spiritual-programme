-- Supabase SQL Setup for Spiritual Programme
-- Run these commands in your Supabase dashboard: https://app.supabase.com/project/[PROJECT_ID]/sql

-- 1. SUBSCRIBERS TABLE (for email subscriptions)
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  confirmed boolean default true,
  current_week_id int default 1,
  current_day_num int default 1,
  unsubscribe_token text unique default gen_random_uuid()::text,
  created_at timestamp default now()
);

-- 2. REFLECTIONS TABLE (daily reflections shared by users)
create table if not exists reflections (
  id uuid primary key default gen_random_uuid(),
  week_id int not null,
  day_num int not null,
  content text not null,
  display_name text default 'Anonymous',
  likes int default 0,
  created_at timestamp default now()
);

-- 3. PRAYER_REQUESTS TABLE (prayer requests shared by users)
create table if not exists prayer_requests (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  display_name text default 'Anonymous',
  prayer_count int default 0,
  created_at timestamp default now()
);

-- 4. INCREMENT_LIKES FUNCTION (for liking reflections)
create or replace function increment_likes(reflection_id uuid)
returns void as $$
  update reflections set likes = likes + 1 where id = reflection_id;
$$ language sql;

-- 5. INCREMENT_PRAYER_COUNT FUNCTION (for praying for requests)
create or replace function increment_prayer_count(prayer_id uuid)
returns void as $$
  update prayer_requests set prayer_count = prayer_count + 1 where id = prayer_id;
$$ language sql;

-- 6. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
alter table subscribers enable row level security;
alter table reflections enable row level security;
alter table prayer_requests enable row level security;

-- Subscribers: Service role bypasses RLS, so no policy needed
-- (subscribers table is only accessed via server-side API routes)

-- Reflections: Allow public reads, inserts, and updates (for likes)
create policy "reflections_public_read" on reflections
  as PERMISSIVE for SELECT using (true);

create policy "reflections_allow_insert" on reflections
  as PERMISSIVE for INSERT with check (true);

create policy "reflections_allow_updates" on reflections
  as PERMISSIVE for UPDATE using (true) with check (true);

-- Prayer Requests: Allow public reads, inserts, and updates (for prayer count)
create policy "prayer_requests_public_read" on prayer_requests
  as PERMISSIVE for SELECT using (true);

create policy "prayer_requests_allow_insert" on prayer_requests
  as PERMISSIVE for INSERT with check (true);

create policy "prayer_requests_allow_updates" on prayer_requests
  as PERMISSIVE for UPDATE using (true) with check (true);

-- Optional: Create indexes for better performance
create index if not exists idx_reflections_week_day on reflections(week_id, day_num);
create index if not exists idx_reflections_created_at on reflections(created_at desc);
create index if not exists idx_prayer_requests_created_at on prayer_requests(created_at desc);
create index if not exists idx_subscribers_email on subscribers(email);
