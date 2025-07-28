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
import { ItemWithPaginationResponse } from "../models/_global";

export class WalletAPI {
    static async getWalletInfo(installationId: string) {
        return HttpClient.get<AccountRecord>(ENDPOINTS.WALLET.GET_WALLET,  { params: { installationId } });
    }

    static async withdrawAsset(data: WithdrawAssetDto) {
        return HttpClient.post<AccountRecord>(ENDPOINTS.WALLET.WITHDRAW, data);
    }

    static async swapAsset(data: SwapAssetDto) {
        return HttpClient.post<AccountRecord>(ENDPOINTS.WALLET.SWAP, data);
    }

    static async getTransactions(query?: QueryTransactionDto) {
        return HttpClient.get<ItemWithPaginationResponse<"transactions", TransactionDto[]>>(
            ENDPOINTS.WALLET.TRANSACTIONS, { params: query });
    }

    static async recordWalletTopups(installationId: string) {
        return HttpClient.post<RecordWalletTopupsResponse>(
            ENDPOINTS.WALLET.RECORD_WALLET_TOPUPS, undefined, { params: { installationId } });
    }
}