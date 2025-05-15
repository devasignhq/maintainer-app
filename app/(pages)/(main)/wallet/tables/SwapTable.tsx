"use client";

const SwapTable = () => {
    return (
        <>
            <thead>
                <tr className="pb-[7px] border-b border-[#585858] text-table-header text-dark-100 flex gap-5">
                    <th className="w-[33%]">Asset (From)</th>
                    <th className="w-[33%]">Asset (To)</th>
                    <th className="w-[31%]">Time</th>
                </tr>
            </thead>
            <tbody className="grow overflow-y-auto">
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[33%] text-indicator-400">240.00 XLM</td>
                    <td className="w-[33%] text-primary-100">124 USDC</td>
                    <td className="w-[31%]">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[33%] text-indicator-400">240.00 USDC</td>
                    <td className="w-[33%] text-primary-100">124 XLM</td>
                    <td className="w-[31%]">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[33%] text-indicator-400">240.00 USDC</td>
                    <td className="w-[33%] text-primary-100">124 XLM</td>
                    <td className="w-[31%]">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[33%] text-indicator-400">240.00 XLM</td>
                    <td className="w-[33%] text-primary-100">124 USDC</td>
                    <td className="w-[31%]">03/02/2025 12:39 AM</td>
                </tr>
            </tbody>
        </>
    );
}
 
export default SwapTable;