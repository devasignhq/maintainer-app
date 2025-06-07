"use client";
import Link from "next/link";
import { TransactionDto } from "@/app/models/wallet.model";
import { formatDateTime, moneyFormat } from "@/app/utils/helper";
import { ROUTES } from "@/app/utils/data";

type BountyTableProps = {
    data: TransactionDto[];
    loading: boolean;
    loadingMore: boolean;
    noMore: boolean;
    loadMore: () => void;
}

const BountyTable = ({
    data,
    loading,
    loadingMore,
    noMore,
    loadMore
}: BountyTableProps) => {
    return (
        <>
            <thead>
                <tr className="pb-[7px] border-b border-[#585858] text-table-header text-dark-100 flex gap-5">
                    <th className="w-[18%]">Task Reference</th>
                    <th className="w-[33%]">GitHub Issue</th>
                    <th className="w-[15%]">Contributor @</th>
                    <th className="w-[10%]">Bounty</th>
                    <th className="w-[18%]">Time</th>
                </tr>
            </thead>
            <tbody className="grow overflow-y-auto">
                {data.map((transaction) => (
                    <tr 
                        key={transaction.id} 
                        className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5"
                    >
                        <td className="w-[18%]">
                            <Link 
                                href={ROUTES.TASKS + "?taskId=" + transaction.taskId} 
                                target="_blank"
                                className="py-[5px] px-[7px] bg-[linear-gradient(130.86deg,_rgba(254,137,31,0.175)_15.53%,_rgba(254,137,31,0.075)_79.38%)]"
                            >
                                {transaction.taskId}
                            </Link>
                        </td>
                        <td className="w-[33%] text-light-200 underline">
                            <Link href={transaction.task?.issue.url || ""} target="_blank">
                                {transaction.task?.issue.url}
                            </Link>
                        </td>
                        <td className="w-[15%]">{transaction.task?.contributor?.username}</td>
                        <td className="w-[10%] text-primary-100">
                            {moneyFormat(transaction.task?.bounty || "")} USDC
                        </td>
                        <td className="w-[18%]">{formatDateTime(transaction.doneAt)}</td>
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
 
export default BountyTable;