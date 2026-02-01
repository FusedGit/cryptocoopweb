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
  Wallet,
  ArrowLeftRight,
  AlertCircle,
  PieChart,
  BarChart3,
  TrendingDown,
  Lock,
  Activity,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { NavMainGrouped } from "@/components/nav-main-grouped"
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
    ],
    investorManagement: [
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
    ],
    businessOps: [
      {
        title: "Liquidity Pools",
        url: "/admin/liquidity",
        icon: Wallet,
      },
      {
        title: "Exchange Trades",
        url: "/admin/trades",
        icon: ArrowLeftRight,
      },
      {
        title: "Profit & Loss",
        url: "/admin/pnl",
        icon: BarChart3,
      },
      {
        title: "Frozen Funds",
        url: "/admin/frozen",
        icon: Lock,
      },
      {
        title: "Risk Analytics",
        url: "/admin/risk",
        icon: AlertCircle,
      },
    ],
    compliance: [
      {
        title: "Fund Movements",
        url: "/admin/fund-tracking",
        icon: Activity,
      },
      {
        title: "Wallet Addresses",
        url: "/admin/wallets",
        icon: Wallet,
      },
      {
        title: "Transparency Reports",
        url: "/admin/transparency",
        icon: FileText,
      },
      {
        title: "Audit Logs",
        url: "/admin/audit",
        icon: History,
      },
    ],
    admin: [
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
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foreground">
                  <Image src="/Logo.svg" alt="CryptoCoop" width={18} height={18} className="invert dark:invert-0" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CryptoCoop</span>
                  <span className="truncate text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMainGrouped title="Dashboard" items={data.navMain} />
        <NavMainGrouped title="Investor Management" items={data.investorManagement} />
        <NavMainGrouped title="Business Operations" items={data.businessOps} />
        <NavMainGrouped title="Compliance & Tracking" items={data.compliance} />
        {data.admin.length > 0 && <NavMainGrouped title="Administration" items={data.admin} />}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
