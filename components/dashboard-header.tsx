"use client"

import type { User } from "@/lib/auth"
import { logout } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const pathname = usePathname()

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Filter Tree Builder</h1>
            <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/dashboard">
              <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/builder">
              <Button variant={pathname === "/dashboard/builder" ? "secondary" : "ghost"} size="sm">
                Builder
              </Button>
            </Link>
            <Link href="/dashboard/schema">
              <Button variant={pathname === "/dashboard/schema" ? "secondary" : "ghost"} size="sm">
                Schema
              </Button>
            </Link>
            <Link href="/dashboard/test">
              <Button variant={pathname === "/dashboard/test" ? "secondary" : "ghost"} size="sm">
                Test
              </Button>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user.username}</span>
          <form action={logout}>
            <Button variant="outline" size="sm" type="submit">
              Logout
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
