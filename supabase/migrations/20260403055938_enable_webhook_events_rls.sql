-- Enable RLS on the webhook_events table
-- We purposefully do NOT add any policies here. Enabling RLS without policies defaults to a "deny all" 
-- for clients (anon/authenticated), perfectly securing it! The server logic using service_role bypasses RLS.
alter table public.webhook_events enable row level security;
