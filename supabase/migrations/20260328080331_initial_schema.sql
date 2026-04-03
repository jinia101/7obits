create extension if not exists "uuid-ossp";

create table workspaces ( 
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    name text not null,
    slug text unique not null, -- url-safe name 
    currency text not null default 'INR',
    logo_url text,
    gstin text, -- GST number
    address jsonb not null default '{}',
    settings jsonb not null default '{}',
    created_at timestamptz not null default now(),
    deleted_at timestamptz 
);


create table clients (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    name text not null,
    email text not null,
    company text,
    phone text,
    address jsonb not null default '{}',
    gstin text,
    notes text,
    created_at timestamptz not null default now(),
    deleted_at timestamptz 
);


create table projects (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    client_id uuid not null references clients(id),
    proposal_id uuid, -- set after proposal signing
    title text not null,
    status text not null default 'active' check (status in ('active','paused','completed','cancelled')),
    budget_paise integer, -- store as paise/cents
    hourly_rate_paise integer,
    estimated_hours numeric(8,2),
    deadline date,
    notes text,
    created_at timestamptz not null default now(),
    deleted_at timestamptz 
);


create table tasks (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    project_id uuid not null references projects(id) on delete cascade,
    title text not null,
    status text not null default 'todo' check (status in ('todo','in_progress','in_review','done')),
    priority text not null default 'medium' check (priority in ('low','medium','high')),
    estimated_hours numeric(6,2),
    due_date date,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    deleted_at timestamptz
);
    
    
    
    
create table milestones (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    project_id uuid not null references projects(id) on delete cascade,
    title text not null, description text,
    amount_paise integer not null, percentage numeric(5,2),
    status text not null default 'upcoming' check (status in ('upcoming','awaiting_approval','approved','invoiced','paid')),
    due_date date,
    sort_order integer not null default 0,
    created_at timestamptz not null default now() 
);
    
    
    
create table time_entries (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    project_id uuid not null references projects(id),
    task_id uuid references tasks(id), -- optional invoice_id uuid, -- set when invoiced
    started_at timestamptz not null,
    ended_at timestamptz not null,
    duration_secs integer not null, -- computed, stored for perf
    notes text,
    is_billable boolean not null default true,
    invoiced_at timestamptz, -- null = not yet billed
    created_at timestamptz not null default now()
);


alter table workspaces enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table tasks enable row level security;
alter table milestones enable row level security;
alter table time_entries enable row level security;