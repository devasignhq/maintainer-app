import { useEffect, useState } from "react";
import { BalanceLineNative, BalanceLineAsset, AccountRecord, AssetType } from "../models/horizon.model";

type WalletBalance = BalanceLineNative | BalanceLineAsset;
type USDCBalance = BalanceLineAsset<AssetType.credit12>;

export class HorizonAPI {
    static streamAccount(walletAddress: string) {
        const event = new EventSource(
            `https://horizon-testnet.stellar.org/accounts/${walletAddress}`,
        );

        return event;
    }
}

export function useStreamAccountBalance(walletAddress: string | undefined) {
    const [accountBalance, setAccountBalance] = useState<WalletBalance[]>([]);
    
    useEffect(() => {
        if (!walletAddress) return;

        const eventSource = HorizonAPI.streamAccount(walletAddress);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        eventSource.onmessage = function (message: any) {
            const result = (message.data ? JSON.parse(message.data) : message) as AccountRecord;

            setAccountBalance(result.balances as WalletBalance[]);
        };
    }, [walletAddress])

    return {
        xlmBalance: parseFloat(
            accountBalance.find(balance => balance.asset_type === "native")?.balance || "0"
        ).toFixed(2),
        usdcBalance: parseFloat(
            accountBalance.find(
                (balance) => balance.asset_type === "credit_alphanum12" 
                    && (balance as USDCBalance).asset_code === "USDC"
            )?.balance || "0"
        ).toFixed(2),
    };
}