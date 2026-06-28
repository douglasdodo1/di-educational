import AppSidebar from "@/components/app-sidebar/Sidebar";
import Topbar from "@/components/topbar/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex h-screen flex-col">
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-y-auto p-6 md:p-12">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
