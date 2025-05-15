"use client";

const AllTable = () => {
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
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 grid grid-cols-10 gap-5">
                    <td className="col-span-4">Bounty</td>
                    <td className="col-span-3 text-indicator-500">-245.00 USDC</td>
                    <td className="col-span-3">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 grid grid-cols-10 gap-5">
                    <td className="col-span-4">Swap (USDC to XLM)</td>
                    <td className="col-span-3">24.00 USDC to 100.00 XLM</td>
                    <td className="col-span-3">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 grid grid-cols-10 gap-5">
                    <td className="col-span-4">Withdrawal</td>
                    <td className="col-span-3 text-indicator-500">-245.00 XLM</td>
                    <td className="col-span-3">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 grid grid-cols-10 gap-5">
                    <td className="col-span-4">Top Up</td>
                    <td className="col-span-3 text-indicator-100">+245.00 XLM</td>
                    <td className="col-span-3">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 grid grid-cols-10 gap-5">
                    <td className="col-span-4">Bounty</td>
                    <td className="col-span-3 text-indicator-500">-245.00 USDC</td>
                    <td className="col-span-3">03/02/2025 12:39 AM</td>
                </tr>
                <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 grid grid-cols-10 gap-5">
                    <td className="col-span-4">Swap (XLM to USDC)</td>
                    <td className="col-span-3">367.00 XLM to 145.00 USDC</td>
                    <td className="col-span-3">03/02/2025 12:39 AM</td>
                </tr>
            </tbody>
        </>
    );
}
 
export default AllTable;