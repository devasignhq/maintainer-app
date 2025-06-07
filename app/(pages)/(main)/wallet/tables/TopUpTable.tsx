"use client";
import { TransactionDto } from "@/app/models/wallet.model";
import { formatDateTime, moneyFormat } from "@/app/utils/helper";

type TopUpTableProps = {
    data: TransactionDto[];
    loading: boolean;
    loadingMore: boolean;
    noMore: boolean;
    loadMore: () => void;
}

const TopUpTable = ({
    data,
    loading,
    loadingMore,
    noMore,
    loadMore
}: TopUpTableProps) => {
    return (
        <>
            <thead>
                <tr className="pb-[7px] border-b border-[#585858] text-table-header text-dark-100 flex gap-5">
                    <th className="w-[45%]">Source Address</th>
                    <th className="w-[10.5%]">Asset</th>
                    <th className="w-[17%]">Amount</th>
                    <th className="w-[22.5%]">Time</th>
                </tr>
            </thead>
            <tbody className="grow overflow-y-auto">
                {data.map((transaction) => (
                    <tr 
                        key={transaction.id} 
                        className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5"
                    >
                        <td className="w-[45%] text-light-200">{transaction.sourceAddress}</td>
                        <td className="w-[10.5%]">{transaction.asset}</td>
                        <td className="w-[17%] text-indicator-100">{moneyFormat(transaction.amount)}</td>
                        <td className="w-[22.5%]">{formatDateTime(transaction.doneAt)}</td>
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
 
export default TopUpTable;