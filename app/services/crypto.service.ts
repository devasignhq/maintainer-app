import { HttpClient } from "@/lib/axiosInstance";
import { ENDPOINTS } from "./_endpoints";
import { AccountRecord, SwapCryptoDto, WithdrawCryptoDto } from "../models/crypto.model";

export class CryptoAPI {
    static async getWallet() {
        return HttpClient.get<AccountRecord>(ENDPOINTS.CRYPTO.GET_WALLET);
    }

    static async withdraw(data: WithdrawCryptoDto) {
        return HttpClient.post<AccountRecord>(ENDPOINTS.CRYPTO.WITHDRAW, data);
    }

    static async swap(data: SwapCryptoDto) {
        return HttpClient.post<AccountRecord>(ENDPOINTS.CRYPTO.SWAP, data);
    }
}