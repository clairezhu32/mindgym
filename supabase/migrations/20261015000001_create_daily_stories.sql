-- Daily stories: lazily-generated personalized visualization story per user per day
create table daily_stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  story_text text not null,
  category text not null,
  audio_url text,
  created_at timestamptz default now(),
  unique(user_id, date)
);

alter table daily_stories enable row level security;

create policy "Users can read their own daily stories"
  on daily_stories for select
  using (auth.uid() = user_id);

create policy "Users can create their own daily stories"
  on daily_stories for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own daily stories"
  on daily_stories for update
  using (auth.uid() = user_id);
