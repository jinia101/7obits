import { redirect } from 'next/navigation'
import { createServerClient } from '@7obits/db'
import { Sidebar } from '@/components/layout/sidebar'
import { WorkspaceProvider } from '@/components/providers/workspace'

export default async function DashboardLayout({
  children
}: { children: React.ReactNode }) {
  const supabase = await createServerClient()
  
  // Step 1: check if there is a logged-in user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  
  // Step 2: load the workspace for this user
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('*')
    .eq('owner_id', user.id)
    .single()
    
  // Step 3: if no workspace exists, send to onboarding
  if (!workspace) redirect('/onboarding')
  
  return (
    <WorkspaceProvider workspace={workspace}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="max-w-7xl mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </WorkspaceProvider>
  )
}
