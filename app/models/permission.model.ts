import { ProjectDto } from "./project.model"
import { UserDto } from "./user.model"

export type PermissionDto = {
    code: string
    name: string
    isDefault: boolean
    createdAt: string
    updatedAt: string
}

export type UserProjectPermissionDto = {
    id: string
    userId: string
    projectId: string
    permissionCodes: string[]
    assignedBy: string | null
    assignedAt: string

    permissions?: PermissionDto[]
    user?: UserDto
    project?: ProjectDto
}