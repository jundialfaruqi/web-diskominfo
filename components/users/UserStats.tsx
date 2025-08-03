"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Shield, Edit } from "lucide-react"

interface UserStatsProps {
  stats: {
    total_users: number
    active_users: number
    inactive_users: number
    super_admins: number
    editors: number
  }
}

export function UserStats({ stats }: UserStatsProps) {
  const statCards = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: Users,
      description: "Total semua user",
      color: "text-blue-600"
    },
    {
      title: "Active Users",
      value: stats.active_users,
      icon: UserCheck,
      description: "User yang aktif",
      color: "text-green-600"
    },
    {
      title: "Inactive Users",
      value: stats.inactive_users,
      icon: UserX,
      description: "User yang tidak aktif",
      color: "text-red-600"
    },
    {
      title: "Super Admins",
      value: stats.super_admins,
      icon: Shield,
      description: "User dengan role super admin",
      color: "text-purple-600"
    },
    {
      title: "Editors",
      value: stats.editors,
      icon: Edit,
      description: "User dengan role editor",
      color: "text-orange-600"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}