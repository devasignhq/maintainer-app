import { useState, useEffect, useRef, useCallback } from 'react';
import { BalanceLineNative, BalanceLineAsset, AccountRecord, AssetType } from "../models/horizon.model";

type WalletBalance = BalanceLineNative | BalanceLineAsset;
type USDCBalance = BalanceLineAsset<AssetType.credit4>;

interface StreamState {
    xlmBalance: string;
    usdcBalance: string;
    isConnected: boolean;
    error: string | null;
    lastUpdated: Date | null;
}

interface PriceData {
    xlmToUsdc: number;
    lastUpdated: Date;
}
export class HorizonAPI {
    static streamAccount(walletAddress: string, isTestnet: boolean = false) {
        const baseUrl = isTestnet 
            ? 'https://horizon-testnet.stellar.org' 
            : 'https://horizon.stellar.org';
        
        const eventSource = new EventSource(
            `${baseUrl}/accounts/${walletAddress}`
        );

        return eventSource;
    }
}

export function useStreamAccountBalance(
    walletAddress: string | undefined,
    isTestnet: boolean = false
) {
    const [state, setState] = useState<StreamState>({
        xlmBalance: "0.00",
        usdcBalance: "0.00",
        isConnected: false,
        error: null,
        lastUpdated: null
    });
    
    const eventSourceRef = useRef<EventSource | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttempts = useRef(0);

    useEffect(() => {
        if (!walletAddress) {
            setState({
                xlmBalance: "0.00",
                usdcBalance: "0.00",
                isConnected: false,
                error: null,
                lastUpdated: null
            });
            return;
        }

        const maxReconnectAttempts = 5;
        const reconnectDelay = 3000;

        function cleanup() {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
        }

        function updateBalances(balances: WalletBalance[]) {
            const xlmBalance = parseFloat(
                balances.find(balance => balance.asset_type === "native")?.balance || "0"
            ).toFixed(2);

            const usdcBalance = parseFloat(
                balances.find(
                    (balance) => (balance as USDCBalance).asset_code === "USDC"
                )?.balance || "0"
            ).toFixed(2);

            setState(prev => ({
                ...prev,
                xlmBalance,
                usdcBalance,
                lastUpdated: new Date(),
                error: null
            }));
        }

        function connect() {
            cleanup();

            try {
                const baseUrl = isTestnet 
                    ? 'https://horizon-testnet.stellar.org' 
                    : 'https://horizon.stellar.org';
                
                const eventSource = new EventSource(`${baseUrl}/accounts/${walletAddress}`);
                eventSourceRef.current = eventSource;

                eventSource.onopen = () => {
                    setState(prev => ({ ...prev, isConnected: true, error: null }));
                    reconnectAttempts.current = 0;
                };

                eventSource.onmessage = (message) => {
                    const data = message.data ? JSON.parse(message.data) : message;
                    const result = data as AccountRecord;
                    
                    if (result.balances) {
                        updateBalances(result.balances as WalletBalance[]);
                    }
                };

                eventSource.onerror = () => {
                    setState(prev => ({ 
                        ...prev, 
                        isConnected: false, 
                        error: 'Connection lost' 
                    }));

                    // Reconnection logic
                    if (reconnectAttempts.current < maxReconnectAttempts) {
                        const delay = reconnectDelay * Math.pow(2, reconnectAttempts.current);
                        reconnectAttempts.current++;
                        
                        reconnectTimeoutRef.current = setTimeout(connect, delay);
                    } else {
                        setState(prev => ({ 
                            ...prev, 
                            error: 'Max reconnection attempts reached' 
                        }));
                    }
                };

            } catch {
                setState(prev => ({ 
                    ...prev, 
                    error: 'Failed to establish connection',
                    isConnected: false 
                }));
            }
        }

        connect();
        return cleanup;
    }, [walletAddress, isTestnet]);

    const reconnect = () => {
        reconnectAttempts.current = 0;
        setState(prev => ({ ...prev, error: null }));
    };

    return {
        ...state,
        reconnect
    };
}

export function useAccountBalancePolling(
    walletAddress: string | undefined,
    intervalMs: number = 10000,
    isTestnet: boolean = false
) {
    const [state, setState] = useState<Omit<StreamState, 'isConnected'>>({
        xlmBalance: "0.00",
        usdcBalance: "0.00",
        error: null,
        lastUpdated: null
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchBalance = useCallback(async () => {
        if (!walletAddress) return;

        setIsLoading(true);
        const baseUrl = isTestnet 
            ? 'https://horizon-testnet.stellar.org' 
            : 'https://horizon.stellar.org';

        try {
            const response = await fetch(`${baseUrl}/accounts/${walletAddress}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            const xlmBalance = parseFloat(
                data.balances.find((balance: WalletBalance) => 
                    balance.asset_type === "native"
                )?.balance || "0"
            ).toFixed(2);

            const usdcBalance = parseFloat(
                data.balances.find(
                    (balance: WalletBalance) => (balance as USDCBalance).asset_code === "USDC"
                )?.balance || "0"
            ).toFixed(2);

            setState({
                xlmBalance,
                usdcBalance,
                error: null,
                lastUpdated: new Date()
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Failed to fetch balance'
            }));
        } finally {
            setIsLoading(false);
        }
    }, [walletAddress, isTestnet]);

    useEffect(() => {
        if (walletAddress) {
            fetchBalance();
            intervalRef.current = setInterval(fetchBalance, intervalMs);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [walletAddress, intervalMs, fetchBalance]);

    return {
        ...state,
        isLoading,
        refresh: fetchBalance
    };
}

export function useXLMUSDCFromStellarDEX(intervalMs: number = 10000, pause: boolean = false) {
    const [priceData, setPriceData] = useState<PriceData>({
        xlmToUsdc: 0,
        lastUpdated: new Date()
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchStellarDEXPrice = async () => {
        try {
            // Query Stellar DEX for XLM/USDC orderbook
            const response = await fetch(
                'https://horizon.stellar.org/order_book?' + 
                'selling_asset_type=native&' +
                'buying_asset_type=credit_alphanum4&' +
                'buying_asset_code=USDC&' +
                'buying_asset_issuer=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Get the best bid (highest price someone will pay for XLM in USDC)
            const bestBid = data.bids[0];
            if (bestBid) {
                const price = parseFloat(bestBid.price);
                setPriceData({
                    xlmToUsdc: price,
                    lastUpdated: new Date()
                });
            }
            
            setError(null);
            setIsLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch Stellar DEX price');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (pause) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }
        
        fetchStellarDEXPrice();
        intervalRef.current = setInterval(fetchStellarDEXPrice, intervalMs);
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [intervalMs, pause]);

    return {
        xlmPrice: priceData.xlmToUsdc.toFixed(7),
        lastUpdated: priceData.lastUpdated,
        isLoading,
        error,
        refresh: fetchStellarDEXPrice
    };
}