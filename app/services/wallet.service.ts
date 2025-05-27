import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { AccountRecord } from "../models/horizon.model";
import {
    SwapAssetDto,
    QueryTransactionDto,
    TransactionDto,
    WithdrawAssetDto
} from "../models/wallet.model";

export class WalletAPI {
    static async getWalletInfo() {
        return HttpClient.get<AccountRecord>(ENDPOINTS.WALLET.GET_WALLET);
    }

    static async withdrawAsset(data: WithdrawAssetDto) {
        return HttpClient.post<AccountRecord>(ENDPOINTS.WALLET.WITHDRAW, data);
    }

    static async swapAsset(data: SwapAssetDto) {
        return HttpClient.post<AccountRecord>(ENDPOINTS.WALLET.SWAP, data);
    }

    static async getTransactions(query: QueryTransactionDto) {
        return HttpClient.get<TransactionDto>(ENDPOINTS.WALLET.SWAP, { params: query });
    }
}