
create table if not exists public.tournaments (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    banner_url text,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    prize_pool numeric(10,2),
    entry_fee numeric(10,2),
    max_participants integer,
    current_participants integer default 0,
    status text default 'upcoming',
    position integer default 0,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Set up Row Level Security (RLS)
alter table public.tournaments enable row level security;

-- Create policies
create policy "Public tournaments are viewable by everyone"
    on public.tournaments for select
    using (true);

create policy "Only authenticated users can insert tournaments"
    on public.tournaments for insert
    to authenticated
    with check (true);

create policy "Only authenticated users can update their tournaments"
    on public.tournaments for update
    to authenticated
    using (true);

create policy "Only authenticated users can delete their tournaments"
    on public.tournaments for delete
    to authenticated
    using (true);

-- Create indexes
create index if not exists tournaments_status_idx on public.tournaments(status);
create index if not exists tournaments_position_idx on public.tournaments(position);
