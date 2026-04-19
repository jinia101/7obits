-- Seed a test workspace and user
insert into auth.users (id, email, encrypted_password) values ( '00000000-0000-0000-0000-000000000001', 'test@7obits.com', crypt('password123', gen_salt('bf')) ) on conflict do nothing; 
insert into workspaces (id, owner_id, name, slug, currency) values ( '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Test Agency', 'test-agency', 'INR' ) on conflict do nothing;

-- Seed two clients
insert into clients (id, workspace_id, name, email, company) values
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 'Rahul Mehta', 'rahul@mehta.com', 'Mehta Retail Co.'),
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000002', 'Priya Singh', 'priya@startup.com', 'FinEdge Startup')
on conflict do nothing;

-- Seed three projects
insert into projects (workspace_id, client_id, title, status, budget_paise, deadline) values
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000010', 'E-commerce redesign', 'active', 12000000, current_date + 30),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000010', 'Brand identity', 'active', 8500000, current_date + 45),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000011', 'SEO audit', 'completed', 3500000, current_date - 10)
on conflict do nothing;

-- Seed one paid invoice and one pending invoice
insert into invoices (workspace_id, client_id, invoice_number, status, subtotal_paise, tax_paise, total_paise, amount_paid_paise, issued_at, due_at, paid_at) values
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000010', 'INV-001', 'paid', 3000000, 540000, 3540000, 3540000, current_date - 20, current_date - 6, now() - interval '5 days')
on conflict do nothing;

insert into invoices (workspace_id, client_id, invoice_number, status, subtotal_paise, tax_paise, total_paise, issued_at, due_at) values
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000011', 'INV-002', 'overdue', 1750000, 315000, 2065000, current_date - 30, current_date - 16)
on conflict do nothing;
