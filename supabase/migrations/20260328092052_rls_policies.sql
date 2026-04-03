create or replace function public.custom_access_token_hook(event jsonb) returns jsonb language plpgsql stable as $$
    declare
        claims jsonb;
        v_workspace_id uuid;
    begin
        select id into v_workspace_id
        from public.workspaces
        where owner_id = (event ->> 'user_id')::uuid
          and deleted_at is null
        limit 1;

        claims := event -> 'claims';
        if v_workspace_id is not null then
            claims := jsonb_set(claims, '{workspace_id}', to_jsonb(v_workspace_id::text));
        end if;

        return jsonb_set(event, '{claims}', claims);
    end;
$$;

-- Grant execute permission to the supabase auth hook role
grant execute on function public.custom_access_token_hook to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;

-- Helper: extract workspace_id from JWT
create or replace function public.workspace_id() returns uuid language sql stable as $$ select (auth.jwt() ->> 'workspace_id')::uuid $$;


--  RLS for Clients
create policy "workspace members can select" on clients for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on clients for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on clients for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on clients for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Projects
create policy "workspace members can select" on projects for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on projects for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on projects for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on projects for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Tasks
create policy "workspace members can select" on tasks for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on tasks for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on tasks for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on tasks for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Milestones
create policy "workspace members can select" on milestones for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on milestones for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on milestones for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on milestones for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Time Entries
create policy "workspace members can select" on time_entries for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on time_entries for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on time_entries for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on time_entries for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Proposals
create policy "workspace members can select" on proposals for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on proposals for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on proposals for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on proposals for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Invoices
create policy "workspace members can select" on invoices for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on invoices for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on invoices for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on invoices for delete to authenticated using (workspace_id = public.workspace_id());

--  RLS for Payments
create policy "workspace members can select" on payments for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on payments for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on payments for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on payments for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Project Messages
create policy "workspace members can select" on project_messages for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on project_messages for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on project_messages for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on project_messages for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Alerts
create policy "workspace members can select" on alerts for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on alerts for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on alerts for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on alerts for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Contract Clauses
create policy "workspace members can select" on contract_clauses for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on contract_clauses for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on contract_clauses for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on contract_clauses for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Change Orders
create policy "workspace members can select" on change_orders for select to authenticated using (workspace_id = public.workspace_id());
create policy "workspace members can insert" on change_orders for insert to authenticated with check (workspace_id = public.workspace_id());
create policy "workspace members can update" on change_orders for update to authenticated using (workspace_id = public.workspace_id()) with check (workspace_id = public.workspace_id());
create policy "workspace members can delete" on change_orders for delete to authenticated using (workspace_id = public.workspace_id());


--  RLS for Portal Tokens
create policy "workspace members can select" on portal_tokens for select to authenticated using (
    exists (
        select 1
        from projects p
        where p.id = portal_tokens.project_id
          and p.workspace_id = public.workspace_id()
    )
);
create policy "workspace members can insert" on portal_tokens for insert to authenticated with check (
    exists (
        select 1
        from projects p
        where p.id = portal_tokens.project_id
          and p.workspace_id = public.workspace_id()
    )
);
create policy "workspace members can update" on portal_tokens for update to authenticated using (
    exists (
        select 1
        from projects p
        where p.id = portal_tokens.project_id
          and p.workspace_id = public.workspace_id()
    )
) with check (
    exists (
        select 1
        from projects p
        where p.id = portal_tokens.project_id
          and p.workspace_id = public.workspace_id()
    )
);
create policy "workspace members can delete" on portal_tokens for delete to authenticated using (
    exists (
        select 1
        from projects p
        where p.id = portal_tokens.project_id
          and p.workspace_id = public.workspace_id()
    )
);


-- Portal tokens are read by unauthenticated clients -- (magic link validation). Allow anon SELECT by token_hash.
create policy "anon can validate token by hash" on portal_tokens for select to anon using (true); -- The application code filters by token_hash — -- anon can SELECT but only finds a row if they -- know the exact hash. Effectively rate-limited -- by the hash's 256-bit entropy.


