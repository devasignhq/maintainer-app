import { InstallationDto } from "./installation.model"
import { TaskDto } from "./task.model"
import { UserDto } from "./user.model"

export type WithdrawAssetDto = {
    installationId: string
    walletAddress: string
    amount: string
    assetType: "XLM" | "USDC"
}

export type SwapAssetDto = {
    installationId: string
    amount: string
    toAssetType: "XLM" | "USDC"
}

export type TransactionDto = {
    id: string
    txHash: string
    category: TransactionCategory
    amount: number
    doneAt: string
    taskId: string | null
    sourceAddress: string | null
    destinationAddress: string | null
    asset: string | null
    assetFrom: string | null
    assetTo: string | null
    installationId: string
    userId: string
    createdAt: string
    updatedAt: string
    
    task?: TaskDto | null
    installation?: InstallationDto
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