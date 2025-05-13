"use client";
import Link from "next/link";

const BountyTable = () => {
    return (
        <>
            <thead>
                <tr className="pb-[7px] border-b border-[#585858] text-table-header text-dark-100 flex gap-5">
                    <th className="w-[35%] text-start">GitHub Issue</th>
                    <th className="w-[20%] text-start">Payment Hash</th>
                    <th className="w-[13%] text-start">Contributor @</th>
                    <th className="w-[8%] text-start">Bounty</th>
                    <th className="w-[12.5%] text-start">Time</th>
                </tr>
            </thead>
            <tbody className="grow overflow-y-auto">
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[35%] text-start">
                        <Link href={""}>Add anti-fingerprinting capabilities to avoid bot detection</Link>
                    </td>
                    <td className="w-[20%] text-start text-light-200 underline">
                        <Link href={""}>https://stellar.expert/explorer/public/account/GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</Link>
                    </td>
                    <td className="w-[13%] text-start">Lenny_malcolm</td>
                    <td className="w-[8%] text-start text-primary-100">$90</td>
                    <td className="w-[12.5%] text-start">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[35%] text-start">
                        <Link href={""}>Add anti-fingerprinting capabilities to avoid bot detection</Link>
                    </td>
                    <td className="w-[20%] text-start text-light-200 underline">
                        <Link href={""}>https://stellar.expert/explorer/public/account/GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</Link>
                    </td>
                    <td className="w-[13%] text-start">Lenny_malcolm</td>
                    <td className="w-[8%] text-start text-primary-100">$120</td>
                    <td className="w-[12.5%] text-start">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[35%] text-start">
                        <Link href={""}>Add anti-fingerprinting capabilities to avoid bot detection</Link>
                    </td>
                    <td className="w-[20%] text-start text-light-200 underline">
                        <Link href={""}>https://stellar.expert/explorer/public/account/GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</Link>
                    </td>
                    <td className="w-[13%] text-start">Lenny_malcolm</td>
                    <td className="w-[8%] text-start text-primary-100">$55</td>
                    <td className="w-[12.5%] text-start">03/02/2025 12:39 AM</td>
                </tr>
            </tbody>
        </>
    );
}
 
export default BountyTable;