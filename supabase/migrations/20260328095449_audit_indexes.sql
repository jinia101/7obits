create table audit_events ( 
    id uuid primary key default gen_random_uuid(), 
    workspace_id uuid references workspaces(id), 
    actor_id uuid references auth.users(id), 
    entity_type text not null, -- 'invoice', 'proposal'... 
    entity_id uuid, 
    action text not null, -- 'created', 'updated', 'deleted' 
    before_data jsonb, 
    after_data jsonb, 
    ip_address text, 
    user_agent text, 
    created_at timestamptz not null default now() 
); 
-- Append-only: no UPDATE or DELETE ever runs on this table. -- Enforced via RLS — no update/delete policies written. 

alter table audit_events enable row level security; 
create policy "workspace members can read audit log" on audit_events for select to authenticated using (workspace_id = public.workspace_id()); 
-- Only service role (worker) can insert 
create policy "service role can insert" on audit_events for insert to service_role with check (true);


create or replace function public.audit_trigger_fn() returns trigger language plpgsql security definer as $$ begin insert into public.audit_events ( workspace_id, entity_type, entity_id, action, before_data, after_data ) values ( coalesce(NEW.workspace_id, OLD.workspace_id), TG_TABLE_NAME, coalesce(NEW.id, OLD.id), TG_OP, case when TG_OP in ('UPDATE','DELETE') then to_jsonb(OLD) end, case when TG_OP in ('INSERT','UPDATE') then to_jsonb(NEW) end ); return coalesce(NEW, OLD); end; $$; 
-- Attach trigger to financial tables 
create trigger audit_invoices after insert or update or delete on invoices for each row execute function public.audit_trigger_fn(); 
create trigger audit_payments after insert or update or delete on payments for each row execute function public.audit_trigger_fn(); 
create trigger audit_proposals after insert or update or delete on proposals for each row execute function public.audit_trigger_fn();


-- workspace_id index on every table 
create index idx_clients_workspace on clients(workspace_id); 
create index idx_projects_workspace on projects(workspace_id); 
create index idx_tasks_workspace on tasks(workspace_id); 
create index idx_milestones_workspace on milestones(workspace_id); 
create index idx_time_entries_workspace on time_entries(workspace_id); 
create index idx_proposals_workspace on proposals(workspace_id); 
create index idx_invoices_workspace on invoices(workspace_id); 
create index idx_alerts_workspace on alerts(workspace_id); 
create index idx_messages_workspace on project_messages(workspace_id);


-- Invoices: status filtering and due date sorting 
create index idx_invoices_status on invoices(workspace_id, status); 
create index idx_invoices_due_at on invoices(due_at) where deleted_at is null; 
create index idx_invoices_client on invoices(client_id); 

-- Proposals: status and view_token lookup 
create index idx_proposals_status on proposals(workspace_id, status); 
create index idx_proposals_token on proposals(view_token); 

-- Time entries: unbilled lookup (most common query) 
create index idx_time_entries_unbilled on time_entries(project_id) where invoiced_at is null and is_billable is true; 

-- Portal tokens: hash lookup 
create index idx_portal_tokens_hash on portal_tokens(token_hash) where used_at is null; 

-- Alerts: unread count 
create index idx_alerts_unread on alerts(workspace_id) where is_read is false; 

-- Soft-delete: exclude deleted rows from common queries 
create index idx_projects_active on projects(workspace_id) where deleted_at is null;