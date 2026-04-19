-- Enable RLS on clause_templates (system-level lookup table).
-- Templates are read-only for authenticated users; only service_role
-- (migrations / admin) can insert, update, or delete.

alter table public.clause_templates enable row level security;

-- Allow any logged-in user to read templates
create policy "authenticated users can read clause templates"
  on clause_templates for select
  to authenticated
  using (true);
