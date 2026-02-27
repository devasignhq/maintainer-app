import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { AccountRecord } from "../models/horizon.model";
import {
    SwapAssetDto,
    QueryTransactionDto,
    TransactionDto,
    WithdrawAssetDto,
    RecordWalletTopupsResponse
} from "../models/wallet.model";
import { ApiResponse, PaginatedApiResponse } from "../models/_global";

export class WalletAPI {
    static async getWalletInfo(installationId: string) {
        return HttpClient.get<ApiResponse<AccountRecord>>(
            ENDPOINTS.WALLET.GET_WALLET.replace("{installationId}", installationId)
        );
    }

    static async withdrawAsset(data: WithdrawAssetDto) {
        return HttpClient.post<ApiResponse<TransactionDto>>(
            ENDPOINTS.WALLET.WITHDRAW,
            data
        );
    }

    static async swapAsset(data: SwapAssetDto) {
        return HttpClient.post<ApiResponse<TransactionDto>>(
            ENDPOINTS.WALLET.SWAP,
            data
        );
    }

    static async getTransactions(query?: QueryTransactionDto) {
        return HttpClient.get<PaginatedApiResponse<TransactionDto>>(
            ENDPOINTS.WALLET.TRANSACTIONS,
            { params: query }
        );
    }

    static async recordWalletTopups(installationId: string) {
        return HttpClient.post<ApiResponse<RecordWalletTopupsResponse>>(
            ENDPOINTS.WALLET.RECORD_WALLET_TOPUPS,
            undefined,
            { params: { installationId } }
        );
    }
}
