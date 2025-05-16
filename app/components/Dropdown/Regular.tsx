"use client";
import { useClickAway, useToggle } from "ahooks";
import { useRef, useState } from "react";
import { IoIosCheckbox, IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { twMerge } from "tailwind-merge";

type RegularDropdownProps = {
    defaultValue?: string | number;
    options: (string | number)[];
    onChange?: (value: string | number) => void;
    extendedButtonClassName?: string;
    extendedContainerClassName?: string;
    title?: string;
}

const RegularDropdown = ({ 
    defaultValue,
    options,
    onChange,
    extendedButtonClassName,
    extendedContainerClassName,
    title
}: RegularDropdownProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, { toggle }] = useToggle(false);
    const [selectedItem, setSelectedItem] = useState<string | number>(defaultValue || "");

    const selectItem = (field: string | number) => {
        setSelectedItem(field);
        if (onChange) onChange(field);
        toggle();
    };

    useClickAway(() => toggle(), [buttonRef, dropdownRef]);

    return (
        <div className={twMerge("relative whitespace-nowrap", extendedContainerClassName)}>
            <button 
                ref={buttonRef}
                className={twMerge("py-[5px] pl-[15px] pr-2.5 border border-dark-200 text-body-tiny text-light-100 flex items-center gap-[5px]", extendedButtonClassName)}
                onClick={toggle}
            >
                <span>{title || selectedItem}</span>
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
                    <ul className="flex flex-col gap-3 list-none items-start">
                        {options.map((option, index) => (
                            <li 
                                key={index} 
                                className="flex items-center gap-2.5"
                            >
                                {selectedItem === option ? (
                                    <IoIosCheckbox className="text-[18px] text-primary-100" />
                                ) : (
                                    <MdOutlineCheckBoxOutlineBlank className="text-[18px] text-dark-100" />
                                )}
                                <button 
                                    className="text-body-small text-light-100 whitespace-nowrap"
                                    onClick={() => selectItem(option)}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
 
export default RegularDropdown;