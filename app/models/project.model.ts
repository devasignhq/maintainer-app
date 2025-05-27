import { UserProjectPermissionDto } from "./permission.model"
import { SubscriptionPlanDto } from "./subscription-plan.model"
import { TaskDto, TaskSubmission } from "./task.model"
import { UserDto } from "./user.model"
import { TransactionDto } from "./wallet.model"

export type ProjectDto = {
    id: string
    name: string
    description: string
    repoUrls: string[]
    walletAddress: string
    subscriptionPackageId: string | null
    createdAt: string
    updatedAt: string
      
    stats?: ProjectStats
    subscriptionPackage?: SubscriptionPlanDto | null
    tasks?: TaskDto[]
    users?: UserDto[]
    userProjectPermissions?: UserProjectPermissionDto[]
    transactions?: TransactionDto[]
    taskSubmissions?: TaskSubmission[]
}

export type ProjectStats = {
    totalBounty: number;
    openTasks: number;
    completedTasks: number;
    totalTasks: number;
    totalMembers: number;
}

export type CreateProjectDto = {
    name: string
    description?: string
}

export type UpdateProjectDto = Partial<CreateProjectDto>

export type ConnectRepositoryDto = {
    repoUrl: string
}

export type AddTeamMemberDto = {
    username: string
    email: string
    permissionCodes: string[]
}

export type UpdateTeamMemberDto = {
    permissionCodes: string[]
}

export type GetRepoAttachments = {
    repoUrl: string
}

export type QueryProjectDto = {
    searchTerm?: string
    page?: string
    limit?: string
}

export type QueryProjectIssues = {
    page?: number
    limit?: number
    labels?: string
    milestone?: number
    sort?: number
    direction?: number
}

export type AddTeamMemberResponseDto = {
    username: string
    status: "added" | "invited" | "not_found"
    message?: string
}