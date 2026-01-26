"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  FileText,
  Receipt,
  Settings,
  Shield,
  LifeBuoy,
  History,
} from "lucide-react"
import Image from "next/image"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AdminSidebar({ user, role, ...props }: React.ComponentProps<typeof Sidebar> & { user: any; role: string }) {
  const data = {
    user: {
      name: user?.user_metadata?.full_name || role.replace('_', ' ').toUpperCase(),
      email: user?.email || "",
      avatar: user?.user_metadata?.avatar_url || "",
    },
    navMain: [
      {
        title: "Overview",
        url: "/admin",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Investors (CRM)",
        url: "/admin/investors",
        icon: Users,
      },
      {
        title: "Investments",
        url: "/admin/investments",
        icon: TrendingUp,
      },
      {
        title: "Transactions",
        url: "/admin/transactions",
        icon: Receipt,
      },
      {
        title: "Documents",
        url: "/admin/documents",
        icon: FileText,
      },
      {
        title: "Audit Logs",
        url: "/admin/audit",
        icon: History,
      },
      ...(role === 'super_admin' ? [{
        title: "Admin Users",
        url: "/admin/users",
        icon: Shield,
      }] : []),
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "/support",
        icon: LifeBuoy,
      },
    ],
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-red-600">
                  <Shield className="size-4 text-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin Panel</span>
                  <span className="truncate text-xs capitalize">{role.replace('_', ' ')}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
