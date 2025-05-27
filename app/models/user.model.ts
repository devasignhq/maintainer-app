import { BalanceLineAsset } from "./horizon.model"
import { UserProjectPermissionDto } from "./permission.model"
import { ProjectDto } from "./project.model"
import { TaskDto } from "./task.model"
import { TransactionDto } from "./wallet.model"

export type UserDto = {
    userId: string
    username: string
    walletAddress: string
    addressBook: AddressBook[]
    createdAt: string
    updatedAt: string

    contributionSummary?: ContributionSummary | null
    createdTasks?: TaskDto[]
    contributedTasks?: TaskDto[]
    projects?: ProjectDto[]
    userProjectPermissions?: UserProjectPermissionDto[]
    transactions?: TransactionDto[]
    tasksAppliedFor?: TaskDto[]
    assets?: BalanceLineAsset[]
}

export type UserBasic = Pick<UserDto, "userId" | "username" | "walletAddress" | "addressBook" | "createdAt" | "updatedAt">
export type UserProfile = Pick<UserDto, "userId" | "username" | "walletAddress" | "addressBook" | "createdAt" | "updatedAt" | "contributionSummary">

export type AddressBook = {
    name: string
    address: string
}

export type ContributionSummary = {
    id: string
    tasksCompleted: number
    activeTasks: number
    totalEarnings: number
    userId: string
    user?: Pick<UserDto, "username" | "userId" | "walletAddress" | "addressBook" | "createdAt" | "updatedAt">;
}

export type QueryUserDto = {
    view: "basic" | "full" | "profile"
}