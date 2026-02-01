'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const routeNames: Record<string, string> = {
  '/admin': 'Overview',
  '/admin/investors': 'Investors (CRM)',
  '/admin/investments': 'Investments',
  '/admin/transactions': 'Transactions',
  '/admin/documents': 'Documents',
  '/admin/audit': 'Audit Logs',
  '/admin/users': 'Admin Users',
  '/admin/liquidity': 'Liquidity Pools',
  '/admin/trades': 'Exchange Trades',
  '/admin/pnl': 'Profit & Loss',
  '/admin/frozen': 'Frozen Funds',
  '/admin/risk': 'Risk Analytics',
  '/admin/fund-tracking': 'Fund Movements',
  '/admin/wallets': 'Wallet Addresses',
  '/admin/transparency': 'Transparency Reports',
  '/admin/settings': 'Settings',
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  
  // Handle dynamic routes like /admin/investors/[id]
  const segments = pathname.split('/').filter(Boolean)
  const isDetailPage = segments.length > 2
  
  const currentRoute = `/${segments.slice(0, 2).join('/')}`
  const currentName = routeNames[currentRoute] || 'Management'

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/admin">Admin Panel</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          {isDetailPage ? (
            <BreadcrumbLink asChild>
              <Link href={currentRoute}>{currentName}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{currentName}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {isDetailPage && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Details</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
