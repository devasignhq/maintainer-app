"use client";
import Link from "next/link";

const TopUpTable = () => {
    return (
        <>
            <thead>
                <tr className="pb-[7px] border-b border-[#585858] text-table-header text-dark-100 flex gap-5">
                    <th className="w-[60%] pr-[80px] text-start">Payment Hash</th>
                    <th className="w-[15%] text-start">Amount</th>
                    <th className="w-[15%] text-start">Category</th>
                </tr>
            </thead>
            <tbody className="grow overflow-y-auto">
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[60%] pr-[80px] text-start text-light-200">
                        <Link href={""}>https://stellar.expert/explorer/public/account/GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</Link>
                    </td>
                    <td className="w-[15%] text-start">$245.00</td>
                    <td className="w-[15%] text-start">Bounty</td>
                </tr>
            </tbody>
        </>
    );
}
 
export default TopUpTable;