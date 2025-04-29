"use client";
import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import Image from 'next/image';
import Link from "next/link";
import RegularDropdown from "../Dropdown/Regular";

type CreateTaskCardProps = {
    active?: boolean; 
}

const CreateTaskCard = ({ active }: CreateTaskCardProps) => {
    return (
        <div className={`w-full py-3 px-[15px] border cursor-pointer ${active ? "bg-dark-400 border-primary-200" : "border-dark-200 hover:border-light-100"}`}>
            <div className="flex items-center justify-between gap-[5px]">
                <p className="text-body-medium text-light-100 truncate">
                    feat(browser): Add user_data_dir support for persistent browser sessions
                </p>
                <div className="flex items-center gap-[15px]">
                    <span className="py-0.5 px-[7px] bg-primary-300 text-primary-100 text-body-tiny font-bold">bug</span>
                    {active ? (
                        <IoIosCheckbox className="text-[18px] text-primary-100" />
                    ) : (
                        <MdOutlineCheckBoxOutlineBlank className="text-[18px] text-dark-100" />
                    )}
                </div>
            </div>
            <Link href={""} target="_blank" className="text-body-micro text-light-200 mt-[5px]">
                https://github.com/browser-use/browser-use/issues/852
            </Link>
            <div className="flex items-center gap-5 mt-2.5">
                <div className="relative">
                    <Image 
                        src="/usdc.svg" 
                        alt="DevAsign" 
                        width={16}
                        height={16}
                        className="absolute top-1/2 -translate-y-1/2 left-2.5" 
                    />
                    <input
                        type="number"
                        placeholder="0.00"
                        step={0.01}
                        min={0.01}
                        className="w-[115px] py-[7px] pl-[36px] pr-[15px] bg-dark-400 border border-dark-200 text-body-tiny text-light-100"
                    />
                </div>
                <div className="relative flex gap-[7px]">
                    <input
                        type="number"
                        placeholder="0"
                        className="w-[66px] py-[7px] px-[15px] bg-dark-400 border border-dark-200 text-body-tiny text-light-100"
                    />
                    <RegularDropdown
                        defaultValue="Weeks"
                        options={["Weeks", "Days"]}
                    />
                </div>
            </div>
        </div>
    );
}
 
export default CreateTaskCard;