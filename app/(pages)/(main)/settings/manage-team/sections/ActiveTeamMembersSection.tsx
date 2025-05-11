"use client";
import InputField from "@/app/components/InputField";
import { FiEdit3, FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const ActiveTeamMembersSection = () => {
    return (
        <section className="max-h-[calc(100dvh-123px)] w-full p-[30px] sticky top-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-[30px]">
                <h4 className="text-headline-small text-light-100">Team Members</h4>
                <InputField 
                    Icon={FiSearch}
                    attributes={{
                        placeholder: "Search Members",
                        name: "search",
                        style: { fontSize: "12px" },
                    }}
                    extendedContainerClassName="w-[310px]"
                    extendedInputClassName="text-body-tiny text-light-100"
                />
            </div>
            <>
                <thead>
                    <tr className="pb-[7px] border-b border-[#585858] text-table-header text-light-200 flex gap-5">
                        <th className="min-w-[150px] w-[12%] text-start">GitHub @</th>
                        <th className="min-w-[250px] w-[20%] text-start">Email Address</th>
                        <th className="min-w-[620px] w-[50%] text-start">Permissions</th>
                        <th className="grow"></th>
                    </tr>
                </thead>
                <tbody className="grow overflow-y-auto">
                    <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                        <td className="min-w-[150px] w-[12%] text-primary-400">Lenny_Malcolm</td>
                        <td className="min-w-[250px] w-[20%]">5WvDj@example.com</td>
                        <td className="min-w-[620px] w-[50%]">
                            Accept new task application, Review new pull request, Fund wallet, Withdraw from wallet
                            Accept new task application, Review new pull request, Fund wallet, Withdraw from wallet
                        </td>
                        <td className="grow flex items-center gap-2.5 pl-5">
                            <button 
                                className="p-[5px] border border-primary-100 text-primary-100 text-2xl hover:border-transparent hover:bg-light-100 hover:text-dark-500"
                                onClick={() => {}}
                            >
                                <FiEdit3 />
                            </button>
                            <button 
                                className="p-[5px] border border-indicator-500 text-indicator-500 text-2xl hover:border-transparent hover:bg-light-100"
                                onClick={() => {}}
                            >
                                <IoMdClose />
                            </button>
                        </td>
                    </tr>
                    <tr className="py-3.5 border-b border-dark-300 text-table-content text-light-100 flex items-center gap-5">
                        <td className="min-w-[150px] w-[12%] text-primary-400">BishopBethel</td>
                        <td className="min-w-[250px] w-[20%]">sf4dvddbs@example.com</td>
                        <td className="min-w-[620px] w-[50%]">
                            Accept new task application, Review new pull request, Fund wallet
                        </td>
                        <td className="grow flex items-center gap-2.5 pl-5">
                            <button 
                                className="p-[5px] border border-primary-100 text-primary-100 text-2xl hover:border-transparent hover:bg-light-100 hover:text-dark-500"
                                onClick={() => {}}
                            >
                                <FiEdit3 />
                            </button>
                            <button 
                                className="p-[5px] border border-indicator-500 text-indicator-500 text-2xl hover:border-transparent hover:bg-light-100"
                                onClick={() => {}}
                            >
                                <IoMdClose />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </>
        </section>
    );
}
 
export default ActiveTeamMembersSection;