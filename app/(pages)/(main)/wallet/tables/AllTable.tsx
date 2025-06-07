"use client";
import { TransactionDto, TransactionCategory } from "@/app/models/wallet.model";
import { formatDateTime, moneyFormat } from "@/app/utils/helper";

type AllTableProps = {
    data: TransactionDto[];
    loading: boolean;
    loadingMore: boolean;
    noMore: boolean;
    loadMore: () => void;
}

const AllTable = ({
    data,
    loading,
    loadingMore,
    noMore,
    loadMore
}: AllTableProps) => {
    return (
        <>
            <thead>
                <tr className="pb-[7px] border-b border-[#585858] text-table-header text-dark-100 grid grid-cols-10 gap-5">
                    <th className="col-span-4">Category</th>
                    <th className="col-span-3">Amount</th>
                    <th className="col-span-3">Time</th>
                </tr>
            </thead>
            <tbody className="grow overflow-y-auto">
                {data.map((transaction) => (
                    <tr 
                        key={transaction.id} 
                        className="py-3.5 border-b border-dark-300 text-table-content text-light-100 grid grid-cols-10 gap-5"
                    >
                        <td className="col-span-4">{formatCategory(transaction.category)}</td>
                        <td className="col-span-3 text-indicator-500">
                            {moneyFormat(transaction.amount)} {transaction.assetFrom || transaction.asset}
                        </td>
                        <td className="col-span-3">{formatDateTime(transaction.doneAt)}</td>
                    </tr>
                ))}
                {(data.length < 1 && !loading) && (
                    <div className="flex justify-center pt-[18%]">
                        <span className="text-body-medium text-light-100">No transaction to show</span>
                    </div>
                )}
                {(loading && data.length < 1) && (
                    <div className="flex justify-center pt-[18%]">
                        <span className="text-body-medium text-light-100">Loading transactions...</span>
                    </div>
                )}
                {loadingMore && (
                    <div className="flex justify-center pt-2.5">
                        <span className="text-body-medium text-light-100">Loading more transactions...</span>
                    </div>
                )}
                {(!loadingMore && !noMore) && (
                    <button 
                        className="text-body-medium text-light-200 font-bold hover:text-light-100 pt-2.5"
                        onClick={loadMore}
                    >
                        Load More
                    </button>
                )}
            </tbody>
        </>
    );
}
 
export default AllTable;

const formatCategory = (category: TransactionCategory) => {
    switch (category) {
        case "BOUNTY":
            return 'Bounty';
        case "SWAP_USDC":
            return 'Swap (USDC to XLM)';
        case "SWAP_XLM":
            return 'Swap (XLM to USDC)';
        case "WITHDRAWAL":
            return 'Withdrawal';
        case "TOP_UP":
            return 'Top Up';
    }
};