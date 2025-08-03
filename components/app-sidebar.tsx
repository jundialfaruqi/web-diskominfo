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
  // Newspaper,
  // Bell,
  // Image,
  BarChart3,
  // Settings,
  // Search,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Function to get data with active state based on current pathname
const getData = (pathname: string) => {
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
      {
        title: "Pengguna",
        url: "/admin/users",
        icon: Users,
        isActive: isActiveMenu("/admin/users"),
      },
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
  const data = getData(pathname)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}