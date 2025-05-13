"use client";
import Link from "next/link";

const WithdrawalTable = () => {
    return (
        <>
            <thead>
                <tr className="pb-[7px] border-b border-[#585858] text-table-header text-dark-100 flex gap-5">
                    <th className="w-[50%] text-start">Payment Hash</th>
                    <th className="w-[10%] text-start">Asset</th>
                    <th className="w-[15%] text-start">Amount</th>
                    <th className="w-[20%] text-start">Time</th>
                </tr>
            </thead>
            <tbody className="grow overflow-y-auto">
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[50%] text-start text-light-200">
                        <Link href={""}>https://stellar.expert/explorer/public/account/GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</Link>
                    </td>
                    <td className="w-[10%] text-start">USDC</td>
                    <td className="w-[15%] text-start text-primary-100">$245.00</td>
                    <td className="w-[20%] text-start">03/02/2025 12:38 PM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[50%] text-start text-light-200">
                        <Link href={""}>https://stellar.expert/explorer/public/account/GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</Link>
                    </td>
                    <td className="w-[10%] text-start">USDC</td>
                    <td className="w-[15%] text-start text-primary-100">$245.00</td>
                    <td className="w-[20%] text-start">03/02/2025 12:38 PM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[50%] text-start text-light-200">
                        <Link href={""}>https://stellar.expert/explorer/public/account/GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</Link>
                    </td>
                    <td className="w-[10%] text-start">USDC</td>
                    <td className="w-[15%] text-start text-primary-100">$245.00</td>
                    <td className="w-[20%] text-start">03/02/2025 12:38 PM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[50%] text-start text-light-200">
                        <Link href={""}>https://stellar.expert/explorer/public/account/GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</Link>
                    </td>
                    <td className="w-[10%] text-start">USDC</td>
                    <td className="w-[15%] text-start text-primary-100">$245.00</td>
                    <td className="w-[20%] text-start">03/02/2025 12:38 PM</td>
                </tr>
            </tbody>
        </>
    );
}
 
export default WithdrawalTable;