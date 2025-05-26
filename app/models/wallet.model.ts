import { ProjectDto } from "./project.model"
import { TaskDto } from "./task.model"
import { UserDto } from "./user.model"

export type WithdrawAssetDto = {
    walletAddress: string
    amount: string
    assetType: "XLM" | "USDC"
}

export type SwapAssetDto = {
    amount: string
    toAssetType: "XLM" | "USDC"
}

export type TransactionDto = {
    id: string
    category: TransactionCategory
    amount: number
    doneAt: string
    taskId: string | null
    sourceAddress: string | null
    destinationAddress: string | null
    asset: string | null
    assetFrom: string | null
    assetTo: string | null
    projectId: string
    userId: string
    
    task?: TaskDto | null
    project?: ProjectDto
    user?: UserDto
}

export type AllTransationsDto = Pick<TransactionDto, "id" | "category" | "amount" | "doneAt">
export type BountyTransationsDto = Pick<TransactionDto, "id" | "category" | "amount" | "doneAt" | "task">
export type TopUpTransationsDto = Pick<TransactionDto, "id" | "category" | "amount" | "doneAt" | "sourceAddress" | "asset">
export type SwapTransationsDto = Pick<TransactionDto, "id" | "category" | "amount" | "doneAt" | "assetFrom" | "assetTo">
export type WithdrawalTransationsDto = Pick<TransactionDto, "id" | "category" | "amount" | "doneAt" | "destinationAddress" | "asset">

export const TRANSACTION_CATEGORY = {
    BOUNTY: 'BOUNTY',
    SWAP_USDC: 'SWAP_USDC',
    SWAP_XLM: 'SWAP_XLM',
    WITHDRAWAL: 'WITHDRAWAL',
    TOP_UP: 'TOP_UP'
};

export type TransactionCategory = keyof typeof TRANSACTION_CATEGORY;

export type QueryTransactionDto = {
    categories?: string
    page?: number
    limit?: number
    sort?: "asc" | "desc"
}