"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, MessageSquare, UserCircle2, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menu = [
  { id: 1, label: "Painel", to: "/home", icon: LayoutDashboard },
  { id: 2, label: "Atividades Pendentes", to: "/pending-activities", icon: ClipboardList },
  { id: 3, label: "Mensagens", to: "/messages", icon: MessageSquare },
];

const account: { id: 0; label: string; to: string; icon: typeof LayoutDashboard }[] = [
  { id: 0, label: "Meu Perfil", to: "/profile", icon: UserCircle2 },
];

export default function AppSidebar() {
  const pathname = usePathname();

  const isActive = (to: string) => {
    return pathname === to || pathname.startsWith(to + "/");
  };

  return (
    <Sidebar className="bg-sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MENU</SidebarGroupLabel>
          <SidebarMenu className="flex gap-2">
            {menu.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.to)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.to)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Link href={item.to}>
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>PERFIL</SidebarGroupLabel>
          <SidebarMenu className="flex gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive(account[0].to)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(account[0].to)
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Link href={account[0].to}>
                  <UserCircle2 />
                  <span>{account[0].label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
