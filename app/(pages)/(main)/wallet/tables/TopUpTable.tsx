"use client";

const TopUpTable = () => {
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
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[45%] text-light-200">GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</td>
                    <td className="w-[10.5%]">XLM</td>
                    <td className="w-[17%] text-indicator-100">245.00</td>
                    <td className="w-[22.5%]">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[45%] text-light-200">GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</td>
                    <td className="w-[10.5%]">XLM</td>
                    <td className="w-[17%] text-indicator-100">34.30</td>
                    <td className="w-[22.5%]">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[45%] text-light-200">GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</td>
                    <td className="w-[10.5%]">XLM</td>
                    <td className="w-[17%] text-indicator-100">123.00</td>
                    <td className="w-[22.5%]">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                    <td className="w-[45%] text-light-200">GC7L4BVK43SBE3U445M2GXP2FY2AGYMEUO5V5B6GWWFHP2JOXBWOHOA3</td>
                    <td className="w-[10.5%]">XLM</td>
                    <td className="w-[17%] text-indicator-100">690.00</td>
                    <td className="w-[22.5%]">03/02/2025 12:39 AM</td>
                </tr>
            </tbody>
        </>
    );
}
 
export default TopUpTable;