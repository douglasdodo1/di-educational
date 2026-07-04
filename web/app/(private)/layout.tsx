import AppSidebar from '@/components/app-sidebar/Sidebar'
import Topbar from '@/components/topbar/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex h-screen flex-col">
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <div className="md:p-x-12 md:p-y-4 flex min-h-0 flex-1 flex-col p-6">
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout
