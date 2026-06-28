import AppSidebar from "@/components/app-sidebar/Sidebar";
import Hero from "@/components/hero/Hero";
import Topbar from "@/components/topbar/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex h-screen flex-col">
      <Topbar />

      <div className="flex flex-1 ">
        <AppSidebar />
        <div className="flex flex-col flex-1 p-12">
          <Hero />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
