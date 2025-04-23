import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { AccountRecord, SwapCryptoDto, WithdrawCryptoDto } from "../models/wallet.model";

export class WalletAPI {
    static async getWallet() {
        return HttpClient.get<AccountRecord>(ENDPOINTS.WALLET.GET_WALLET);
    }

    static async withdraw(data: WithdrawCryptoDto) {
        return HttpClient.post<AccountRecord>(ENDPOINTS.WALLET.WITHDRAW, data);
    }

    static async swap(data: SwapCryptoDto) {
        return HttpClient.post<AccountRecord>(ENDPOINTS.WALLET.SWAP, data);
    }
}