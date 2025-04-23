export type WithdrawCryptoDto = {
    amount: number;
    walletAddress: string;
    assetType?: "USDC" | "XLM";
}

export type SwapCryptoDto = {
    amount: number;
    toAssetType?: "USDC" | "XLM";
}

export type AccountRecord = {
    id: string;
    paging_token: string;
    account_id: string;
    sequence: string;
    sequence_ledger?: number;
    sequence_time?: string;
    subentry_count: number;
    home_domain?: string;
    inflation_destination?: string;
    last_modified_ledger: number;
    last_modified_time: string;
    thresholds: AccountThresholds;
    flags: Flags;
    balances: (BalanceLineNative | BalanceLineAsset)[];
    signers: AccountRecordSigners[];
    data: (options: {
        value: string;
    }) => Promise<{
        value: string;
    }>;
    data_attr: {
        [key: string]: string;
    };
    sponsor?: string;
    num_sponsoring: number;
    num_sponsored: number;
}

export type BalanceLineNative = {
    balance: string;
    asset_type: "native";
    buying_liabilities: string;
    selling_liabilities: string;
}

export type BalanceLineAsset = {
    balance: string;
    limit: string;
    asset_type: string;
    asset_code: string;
    asset_issuer: string;
    buying_liabilities: string;
    selling_liabilities: string;
    last_modified_ledger: number;
    is_authorized: boolean;
    is_authorized_to_maintain_liabilities: boolean;
    is_clawback_enabled: boolean;
    sponsor?: string;
}

export type AccountThresholds = {
    low_threshold: number;
    med_threshold: number;
    high_threshold: number;
}

export type Flags = {
    auth_immutable: boolean;
    auth_required: boolean;
    auth_revocable: boolean;
    auth_clawback_enabled: boolean;
}

export type AccountRecordSigners = {
    key: string;
    weight: number;
    type: string;
}