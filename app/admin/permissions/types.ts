export interface Permission {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
}

export interface PermissionStats {
  total_permissions: number
  system_permissions: number
  custom_permissions: number
  recent_permissions: number
}

export interface PermissionFormData {
  name: string
}