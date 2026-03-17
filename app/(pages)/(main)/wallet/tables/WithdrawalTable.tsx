"use client";
import { TransactionDto } from "@/app/models/wallet.model";
import { formatDateTime, moneyFormat } from "@/app/utils/helper";

type WithdrawalTableProps = {
    data: TransactionDto[];
    tableFooter?: React.ReactNode;
}

const WithdrawalTable = ({
    data,
    tableFooter
}: WithdrawalTableProps) => {
    return (
        <>
            <thead>
                <tr className="pb-[7px] border-b border-[#585858] text-table-header text-dark-100 flex gap-5">
                    <th className="w-[45%]">Destination Address</th>
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
                        <td className="w-[45%] text-light-200">{transaction.destinationAddress}</td>
                        <td className="w-[10.5%]">{transaction.asset || "XLM"}</td>
                        <td className="w-[17%] text-indicator-500">{moneyFormat(transaction.amount)}</td>
                        <td className="w-[22.5%]">{formatDateTime(transaction.doneAt)}</td>
                    </tr>
                ))}
                {tableFooter}
            </tbody>
        </>
    );
};
 
export default WithdrawalTable;
