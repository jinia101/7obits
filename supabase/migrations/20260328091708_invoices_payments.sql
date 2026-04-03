create table invoices (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    client_id uuid not null references clients(id),
    project_id uuid references projects(id),
    -- optional milestone_id uuid references milestones(id), -- optional
    invoice_number text not null,
    status text not null default 'draft' check (status in ( 'draft','sent','viewed','partial', 'paid','overdue','voided','refunded' )),
    line_items jsonb not null default '[]',
    subtotal_paise integer not null,
    tax_paise integer not null default 0,
    total_paise integer not null,
    amount_paid_paise integer not null default 0,
    currency text not null default 'INR',
    notes text,
    payment_terms text,
    payment_link_url text, -- Stripe/Razorpay link
    payment_provider text, -- 'stripe' | 'razorpay'
    pdf_url text,
    issued_at date not null default current_date,
    due_at date not null,
    sent_at timestamptz,
    paid_at timestamptz,
    voided_at timestamptz,
    created_at timestamptz not null default now(),
    deleted_at timestamptz,
    -- prevent duplicate invoice numbers per workspace
    unique(workspace_id, invoice_number)
);

create table payments (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    invoice_id uuid not null references invoices(id),
    amount_paise integer not null,
    provider text not null, -- 'stripe' | 'razorpay'
    provider_payment_id text not null unique,
    status text not null default 'captured',
    paid_at timestamptz not null default now()
);

-- Idempotency table for webhook deduplication
create table webhook_events (
    id uuid primary key default gen_random_uuid(),
    provider text not null,
    provider_event_id text not null,
    event_type text not null,
    processed_at timestamptz not null default now(),
    unique(provider, provider_event_id) -- prevents double-processing
);

create table project_messages (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    project_id uuid not null references projects(id) on delete cascade,
    sender_type text not null check (sender_type in ('freelancer', 'client')),
    body text not null,
    created_at timestamptz not null default now()
);

create table alerts (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid not null references workspaces(id) on delete cascade,
    type text not null, -- 'invoice_overdue', 'proposal_viewed'...
    title text not null,
    entity_type text, -- 'invoice' | 'project' | 'proposal'
    entity_id uuid,
    is_read boolean not null default false,
    created_at timestamptz not null default now()
);


alter table invoices enable row level security;
alter table payments enable row level security;
alter table project_messages enable row level security;
alter table alerts enable row level security;
-- webhook_events has NO RLS — only the service role writes it

