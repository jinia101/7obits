export type { Database } from '../types/supabase'
import type { Database } from '../types/supabase'


type Tables = Database['public']['Tables'] // Row types — what you get back from SELECT

export type Workspace = Tables['workspaces']['Row']
export type Client = Tables['clients']['Row']
export type Project = Tables['projects']['Row']
export type Task = Tables['tasks']['Row']
export type Milestone = Tables['milestones']['Row']
export type TimeEntry = Tables['time_entries']['Row']
export type Proposal = Tables['proposals']['Row']
export type Invoice = Tables['invoices']['Row']
export type Payment = Tables['payments']['Row']
export type Alert = Tables['alerts']['Row']

// Insert types — what you pass to INSERT
export type NewProject = Tables['projects']['Insert']
export type NewInvoice = Tables['invoices']['Insert']
export type NewProposal = Tables['proposals']['Insert']
export type NewClient = Tables['clients']['Insert']

export { createServerClient } from './server'
export { createClient } from './client'
export { createAdminClient } from './admin'