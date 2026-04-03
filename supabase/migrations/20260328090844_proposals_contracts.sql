create table proposals (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    client_id uuid not null references clients(id),
    title text not null,
    cover_message text,
    status text not null default 'draft' check (status in ( 'draft','sent','viewed', 'signed','declined','expired' )),
    billing_type text not null default 'fixed' check (billing_type in ( 'fixed','hourly','milestone','retainer' )),
    line_items jsonb not null default '[]',
    addons jsonb not null default '[]',
    payment_schedule jsonb not null default '[]',
    subtotal_paise integer not null default 0,
    tax_paise integer not null default 0,
    total_paise integer not null default 0,
    valid_until date,
    view_token text unique, -- shareable URL token
    signed_at timestamptz,
    signed_by_name text, -- typed name on e-sign
    signed_by_ip text,
    clauses_snapshot jsonb, -- frozen copy at signing
    pdf_url text,
    created_at timestamptz not null default now(),
    deleted_at timestamptz
);


create table proposal_views (
    id uuid primary key default gen_random_uuid(),
    proposal_id uuid not null references proposals(id) on delete cascade,
    viewer_ip text,
    user_agent text,
    viewed_at timestamptz not null default now()
); -- Client portal access tokens (magic links) 
    
    
create table portal_tokens (
    id uuid primary key default gen_random_uuid(),
    project_id uuid not null references projects(id) on delete cascade,
    client_email text not null,
    token_hash text not null unique, -- SHA-256 of raw token
    expires_at timestamptz not null,
    used_at timestamptz, -- null = never used
    created_at timestamptz not null default now()
);

create table contract_clauses (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    title text not null,
    body text not null,
    is_default boolean not null default true,
    sort_order integer not null default 0, 
    created_at timestamptz not null default now()
);
    
    
create table change_orders (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    project_id uuid not null references projects(id),
    description text not null,
    line_items jsonb not null default '[]',
    amount_paise integer not null,
    timeline_days integer not null default 0,
    status text not null default 'pending' check (status in ('pending','accepted','declined')),
    created_at timestamptz not null default now()
);


alter table proposals enable row level security;
alter table proposal_views enable row level security;
alter table portal_tokens enable row level security;
alter table contract_clauses enable row level security;
alter table change_orders enable row level security;