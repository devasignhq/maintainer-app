"use client";
import { TransactionDto, TransactionCategory } from "@/app/models/wallet.model";
import { formatDateTime, moneyFormat } from "@/app/utils/helper";

type AllTableProps = {
    data: TransactionDto[];
    tableFooter?: React.ReactNode;
}

const AllTable = ({
    data,
    tableFooter
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
                        {(transaction.category === "SWAP_USDC" || transaction.category === "SWAP_XLM") ? (
                            <td className="col-span-3">
                                {moneyFormat(transaction.fromAmount || "")} {transaction.assetFrom} to {moneyFormat(transaction.toAmount || "")} {transaction.assetTo}
                            </td>
                        ) : (transaction.category === "TOP_UP") ? (
                            <td className="col-span-3 text-indicator-100">
                                {moneyFormat(transaction.amount)} {transaction.asset}
                            </td>
                        ) : (
                            <td className="col-span-3 text-indicator-500">
                                {moneyFormat(transaction.amount)} {transaction.asset}
                            </td>
                        )}
                        <td className="col-span-3">{formatDateTime(transaction.doneAt)}</td>
                    </tr>
                ))}
                {tableFooter}
            </tbody>
        </>
    );
};
 
export default AllTable;

const formatCategory = (category: TransactionCategory) => {
    switch (category) {
        case "BOUNTY":
            return "Bounty";
        case "SWAP_USDC":
            return "Swap (USDC to XLM)";
        case "SWAP_XLM":
            return "Swap (XLM to USDC)";
        case "WITHDRAWAL":
            return "Withdrawal";
        case "TOP_UP":
            return "Top Up";
    }
};
