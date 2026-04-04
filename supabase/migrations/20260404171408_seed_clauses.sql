-- Insert system-level clause templates -- These are copied per-workspace when a freelancer -- sets up their account during onboarding
create table clause_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  sort_order integer not null
);

insert into clause_templates (title, body, sort_order)
values
  ('Scope & deliverables', 'Work is limited to what is explicitly described in this proposal...', 1),
  ('Payment terms', 'Invoices are due within 14 days of issue...', 2),
  ('Intellectual property', 'Full IP ownership transfers to the client upon receipt of final payment...', 3),
  ('Revisions', 'This proposal includes up to 2 rounds of revisions per deliverable...', 4),
  ('Cancellation', 'Either party may cancel with 14 days written notice...', 5);