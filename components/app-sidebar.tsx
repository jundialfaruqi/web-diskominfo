"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  // AudioWaveform,
  BookOpen,
  // Bot,
  // Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  // SquareTerminal,
  Home,
  Users,
  // Calendar,
  // Inbox,
  BarChart3,
  // Search,
  // Settings,
  Shield,
  Key,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { useAuth } from "@/contexts/AuthContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Function to get data with active state based on current pathname
const getData = (pathname: string, user: any) => {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isActiveMenu = (url: string, items?: any[]) => {
    if (url === pathname) return true
    if (items) {
      return items.some(item => item.url === pathname)
    }
    return false
  }

  return {
    user: {
      name: "Admin User",
      email: "admin@diskominfotik.go.id",
      avatar: "/logo-kominfo.png",
    },
    teams: [
      {
        name: "Diskominfotik Pekanbaru",
        logo: GalleryVerticalEnd,
        plan: "Admin Panel",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
        isActive: isActiveMenu("/admin/dashboard"),
      },
      {
        title: "Manajemen Konten",
        url: "#",
        icon: BookOpen,
        isActive: isActiveMenu("#", [
          { url: "/admin/news" },
          { url: "/admin/announcements" },
          { url: "/admin/gallery" },
        ]),
        items: [
          {
            title: "Berita",
            url: "/admin/news",
          },
          {
            title: "Pengumuman",
            url: "/admin/announcements",
          },
          {
            title: "Galeri",
            url: "/admin/gallery",
          },
        ],
      },
      // Menu Pengguna untuk user dengan permission 'view users'
      ...((() => {
        const hasViewUsersPermission = user?.permissions?.some((permission: any) => permission.name === 'view users')
        return hasViewUsersPermission
      })() ? [{
        title: "Pengguna",
        url: "/admin/users",
        icon: Users,
        isActive: isActiveMenu("/admin/users"),
      }] : []),
      // Menu Role & Permission Management
      ...((() => {
        const hasRolePermission = user?.permissions?.some((permission: any) => 
          permission.name === 'view roles' || permission.name === 'view permissions'
        )
        return hasRolePermission
      })() ? [{
        title: "Akses & Izin",
        url: "#",
        icon: Shield,
        isActive: isActiveMenu("#", [
          { url: "/admin/roles" },
          { url: "/admin/permissions" },
        ]),
        items: [
          ...(user?.permissions?.some((permission: any) => permission.name === 'view roles') ? [{
            title: "Role",
            url: "/admin/roles",
          }] : []),
          ...(user?.permissions?.some((permission: any) => permission.name === 'view permissions') ? [{
            title: "Permission",
            url: "/admin/permissions",
          }] : []),
        ],
      }] : []),
      {
        title: "Laporan",
        url: "/admin/reports",
        icon: BarChart3,
        isActive: isActiveMenu("/admin/reports"),
      },
      {
        title: "Pengaturan",
        url: "#",
        icon: Settings2,
        isActive: isActiveMenu("#", [
          { url: "/admin/settings" },
          { url: "/admin/search" },
        ]),
        items: [
          {
            title: "Konfigurasi",
            url: "/admin/settings",
          },
          {
            title: "Pencarian",
            url: "/admin/search",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Sistem Informasi",
        url: "#",
        icon: Frame,
      },
      {
        name: "Portal Berita",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Galeri Foto",
        url: "#",
        icon: Map,
      },
    ],
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user, isLoading, isAuthenticated } = useAuth()
  
  // Force re-render when user data changes
  React.useEffect(() => {
    // Effect for user data changes
  }, [user, user?.roles, user?.permissions, isLoading, isAuthenticated])
  
  // Don't render sidebar until user data is available
  if (isLoading || !isAuthenticated || !user || !user.roles || !user.permissions) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex items-center justify-center p-4">
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-4"></div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }
  
  const data = getData(pathname, user)

  return (
    <Sidebar key={`sidebar-${user.id}-${user.roles?.length}-${user.permissions?.length}`} collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}