"use client";
import { useClickAway, useToggle } from "ahooks";
import { useRef, useState } from "react";
import { IoIosCheckbox, IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

type FilterDropdownProps = {
    title: string;
    options: string[];
}

const FilterDropdown = ({ title, options }: FilterDropdownProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, { toggle }] = useToggle(false);
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
        options.reduce((acc, _, index) => ({ ...acc, [`${index}`]: false }), {})
    );

    const toggleItems = (field: string) => {
        setSelectedItems(previousValue => {
            if (previousValue[field]) {
                return { ...previousValue, [field]: false };
            }
            return { ...previousValue, [field]: true };
        });
    };
    
    useClickAway(() => toggle(), [buttonRef, dropdownRef]);

    return (
        <div className="relative whitespace-nowrap">
            <button 
                ref={buttonRef}
                className="p-2.5 border border-light-200 text-button-large font-extrabold text-light-200 flex items-center gap-[5px]"
                onClick={toggle}
            >
                <span>{title}</span>
                <IoMdArrowDropdown className={`text-2xl ${open && "rotate-180"}`} />
            </button>
            {open && (
                <div 
                    ref={dropdownRef}
                    className="absolute top-0 left-[calc(100%_+_7px)] px-2.5 py-[15px] max-h-[350px] bg-dark-400 
                    dropdown-box shadow-[-20px_4px_40px_0px_#000000] z-[9999999] overflow-y-auto"
                >
                    <button 
                        className="text-body-tiny text-light-200 font-bold sticky top-0 pb-3 hover:text-primary-100"
                        onClick={() => {}}
                    >
                        Clear Selection
                    </button>
                    <ul className="flex flex-col gap-3 list-none items-start">
                        {options.map((option, index) => (
                            <li 
                                key={index} 
                                className="flex items-center gap-2.5 cursor-pointer"
                                onClick={() => toggleItems(`${index}`)}
                            >
                                {selectedItems[`${index}`] ? (
                                    <IoIosCheckbox className="text-[18px] text-primary-100" />
                                ) : (
                                    <MdOutlineCheckBoxOutlineBlank className="text-[18px] text-dark-100" />
                                )}
                                <span className="text-body-small text-light-100">{option}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
 
export default FilterDropdown;