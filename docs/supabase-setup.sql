-- Run this in your Supabase project: SQL Editor → New query → Run

CREATE TABLE IF NOT EXISTS sessions (
  id           uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      uuid    REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category     text    NOT NULL,
  event_name   text,
  event_date   date,
  goal         text,
  pre_mood     integer CHECK (pre_mood BETWEEN 1 AND 5),
  post_mood    integer CHECK (post_mood BETWEEN 1 AND 5),
  completed_at timestamptz DEFAULT now() NOT NULL
);

-- Row-level security: users can only read/write their own rows
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own sessions"
  ON sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);

-- Index for dashboard queries (sorted by date)
CREATE INDEX sessions_user_date ON sessions (user_id, completed_at DESC);
