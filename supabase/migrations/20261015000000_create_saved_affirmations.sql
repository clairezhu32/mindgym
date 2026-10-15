-- Saved affirmations: user-bookmarked affirmation cards
create table saved_affirmations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  affirmation_id text not null,
  created_at timestamptz default now(),
  unique(user_id, affirmation_id)
);

alter table saved_affirmations enable row level security;

create policy "Users can read their own saved affirmations"
  on saved_affirmations for select
  using (auth.uid() = user_id);

create policy "Users can save affirmations"
  on saved_affirmations for insert
  with check (auth.uid() = user_id);

create policy "Users can remove their saved affirmations"
  on saved_affirmations for delete
  using (auth.uid() = user_id);
