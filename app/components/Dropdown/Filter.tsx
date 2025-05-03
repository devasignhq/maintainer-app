"use client";
import { useClickAway, useToggle } from "ahooks";
import { useRef, useState } from "react";
import { IoIosCheckbox, IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { twMerge } from "tailwind-merge";

type FilterDropdownProps = {
    title: string;
    options: string[];
    extendedButtonClassName?: string;
    extendedContainerClassName?: string;
}

const FilterDropdown = ({ title, options, extendedButtonClassName, extendedContainerClassName }: FilterDropdownProps) => {
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
        <div className={twMerge("relative whitespace-nowrap", extendedContainerClassName)}>
            <button 
                ref={buttonRef}
                className={twMerge("p-2.5 border border-light-200 text-button-large font-extrabold text-light-200 flex items-center gap-[5px]", extendedButtonClassName)}
                onClick={toggle}
            >
                <span>{title}</span>
                <IoMdArrowDropdown className={`text-2xl ${open && "rotate-180"}`} />
            </button>
            {open && (
                <div 
                    ref={dropdownRef}
                    className="fixed top-[var(--dropdown-top)] left-[var(--dropdown-left)] px-2.5 py-[15px] max-h-[350px] 
                    bg-dark-400 dropdown-box shadow-[-20px_4px_40px_0px_#000000] z-[110] overflow-y-auto"
                    style={{
                        '--dropdown-top': `${buttonRef.current?.getBoundingClientRect().top}px`,
                        '--dropdown-left': `${buttonRef.current?.getBoundingClientRect().right as number + 7}px`
                    } as React.CSSProperties}
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