"use client"

import * as React from "react"
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Settings2,
  FileText,
  BarChart3,
  LifeBuoy,
  Mail,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: any }) {
  const data = {
    user: {
      name: user?.user_metadata?.full_name || "Investor",
      email: user?.email || "",
      avatar: user?.user_metadata?.avatar_url || "",
    },
    navMain: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Investments",
        url: "/dashboard/investments",
        icon: TrendingUp,
      },
      {
        title: "Portfolio",
        url: "/dashboard/portfolio",
        icon: BarChart3,
      },
      {
        title: "Wallet",
        url: "/dashboard/wallet",
        icon: Wallet,
      },
      {
        title: "Documents",
        url: "/dashboard/documents",
        icon: FileText,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings2,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "/support",
        icon: LifeBuoy,
      },
      {
        title: "Contact",
        url: "mailto:investors@cryptocoop.com",
        icon: Mail,
      },
    ],
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foreground">
                  <Image src="/Logo.svg" alt="CryptoCoop" width={18} height={18} className="invert dark:invert-0" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CryptoCoop</span>
                  <span className="truncate text-xs">Investor Portal</span>
                </div>
              </Link>
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
