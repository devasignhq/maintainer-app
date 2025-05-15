"use client";
import Link from "next/link";

const BountyTable = () => {
    return (
        <>
            <thead>
                <tr className="pb-[7px] border-b border-[#585858] text-table-header text-dark-100 flex gap-5">
                    <th className="w-[6%]">Task No</th>
                    <th className="w-[40%]">GitHub Issue</th>
                    <th className="w-[15%]">Contributor @</th>
                    <th className="w-[10%]">Bounty</th>
                    <th className="w-[23%]">Time</th>
                </tr>
            </thead>
            <tbody className="grow overflow-y-auto">
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[6%]">
                        <Link 
                            href={""} 
                            className="py-[5px] px-[7px] bg-[linear-gradient(130.86deg,_rgba(254,137,31,0.175)_15.53%,_rgba(254,137,31,0.075)_79.38%)]"
                        >
                            #0112
                        </Link>
                    </td>
                    <td className="w-[40%] text-light-200 underline">
                        <Link href={""}>Add anti-fingerprinting capabilities to avoid bot detection</Link>
                    </td>
                    <td className="w-[15%]">Lenny_malcolm</td>
                    <td className="w-[10%] text-primary-100">90 USDC</td>
                    <td className="w-[23%]">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[6%]">
                        <Link 
                            href={""} 
                            className="py-[5px] px-[7px] bg-[linear-gradient(130.86deg,_rgba(254,137,31,0.175)_15.53%,_rgba(254,137,31,0.075)_79.38%)]"
                        >
                            #0112
                        </Link>
                    </td>
                    <td className="w-[40%] text-light-200 underline">
                        <Link href={""}>Add anti-fingerprinting capabilities to avoid bot detection</Link>
                    </td>
                    <td className="w-[15%]">Lenny_malcolm</td>
                    <td className="w-[10%] text-primary-100">90 USDC</td>
                    <td className="w-[23%]">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[6%]">
                        <Link 
                            href={""} 
                            className="py-[5px] px-[7px] bg-[linear-gradient(130.86deg,_rgba(254,137,31,0.175)_15.53%,_rgba(254,137,31,0.075)_79.38%)]"
                        >
                            #0112
                        </Link>
                    </td>
                    <td className="w-[40%] text-light-200 underline">
                        <Link href={""}>Add anti-fingerprinting capabilities to avoid bot detection</Link>
                    </td>
                    <td className="w-[15%]">Lenny_malcolm</td>
                    <td className="w-[10%] text-primary-100">90 USDC</td>
                    <td className="w-[23%]">03/02/2025 12:39 AM</td>
                </tr>
            </tbody>
        </>
    );
}
 
export default BountyTable;