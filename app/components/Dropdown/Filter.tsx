/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { usePopup } from "@/app/utils/hooks";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { IoIosCheckbox, IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { twMerge } from "tailwind-merge";

type FilterDropdownProps = {
    title: string;
    setField: (value: string | number | (string | number)[]) => void;
    extendedButtonClassName?: string;
    buttonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    extendedContainerClassName?: string;
    noMultiSelect?: boolean;
} & ({
    options: (string | number)[];
} | {
    options: Record<string, any>[];
    fieldName: string;
    fieldValue: string;
})

const FilterDropdown = ({
    title,
    options,
    setField,
    extendedButtonClassName,
    buttonAttributes,
    extendedContainerClassName,
    noMultiSelect,
    ...otherProps
}: FilterDropdownProps) => {
    const { menuButtonRef, menuRef, openMenu, toggleMenu } = usePopup();
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
        options.reduce<Record<string, boolean>>((acc, _, index) => ({ ...acc, [`${index}`]: false }), {})
    );

    const toggleItems = (field: string) => {
        if (!noMultiSelect) {
            setSelectedItems(prev => ({
                ...prev,
                [field]: !prev[field]
            }));
            return;
        }

        // Single selection mode
        setSelectedItems(
            Object.keys(selectedItems).reduce((acc, key) => ({
                ...acc,
                [key]: key === field
            }), {})
        );
    };

    const clearSelection = () => {
        setSelectedItems(
            Object.keys(selectedItems).reduce((acc, key) => ({
                ...acc,
                [key]: false
            }), {})
        );
    };

    const applySelection = () => {
        const selectedValues = Object.keys(selectedItems)
            .filter(key => selectedItems[key])
            .map(key => {
                const index = parseInt(key);
                if (typeof options[0] === "object") {
                    const option = options[index] as Record<string, any>;
                    return option[(otherProps as any).fieldName];
                } else {
                    return options[index];
                }
            });

        if (noMultiSelect) {
            setField(selectedValues[0] || "");
        } else {
            setField(selectedValues);
        }

        toggleMenu();
    };

    // Update selected items when options change
    useEffect(() => {
        setSelectedItems(
            options.reduce<Record<string, boolean>>((acc, _, index) => ({ ...acc, [`${index}`]: false }), {})
        );
    }, [options]);

    return (
        <div className={twMerge("relative whitespace-nowrap", extendedContainerClassName)}>
            <button 
                ref={menuButtonRef}
                className={twMerge(
                    "p-2.5 border border-light-200 text-button-large font-extrabold text-light-200 flex items-center gap-[5px]", 
                    extendedButtonClassName
                )}
                onClick={toggleMenu}
                {...buttonAttributes}
            >
                <span>{title}</span>
                <IoMdArrowDropdown className={`text-2xl ${openMenu && "rotate-180"}`} />
            </button>
            {openMenu && (
                <div 
                    ref={menuRef}
                    className="fixed top-[var(--dropdown-top)] left-[var(--dropdown-left)] px-2.5 max-h-[350px] 
                    bg-dark-400 dropdown-box shadow-[-20px_4px_40px_0px_#000000] z-[110] overflow-y-auto"
                    style={{
                        '--dropdown-top': `${menuButtonRef.current?.getBoundingClientRect().top}px`,
                        '--dropdown-left': `${menuButtonRef.current?.getBoundingClientRect().right as number + 7}px`
                    } as React.CSSProperties}
                >
                    <div className="w-full pb-3 pt-[15px] bg-dark-400 sticky top-0">
                        <button 
                            className="w-fit text-body-tiny text-light-200 font-bold hover:text-primary-100"
                            onClick={clearSelection}
                        >
                            Clear Selection
                        </button>
                    </div>
                    <ul className="flex flex-col gap-3 list-none items-start">
                        {options.map((option, index) => (
                            <li 
                                key={index} 
                                className="flex items-center gap-2.5"
                            >
                                {selectedItems[`${index}`] ? (
                                    <IoIosCheckbox className="text-[18px] text-primary-100" />
                                ) : (
                                    <MdOutlineCheckBoxOutlineBlank className="text-[18px] text-dark-100" />
                                )}
                                <button 
                                    className="text-body-small text-light-100"
                                    onClick={() => toggleItems(`${index}`)} 
                                >
                                    {typeof option === "object" ? option[(otherProps as any).fieldName] : option}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="w-full pt-3 pb-[15px] bg-dark-400 sticky bottom-0">
                        <button 
                            className="group w-fit flex items-center gap-[5px] text-primary-100 text-button-large font-extrabold"
                            onClick={applySelection}
                        >
                            <span className="group-hover:text-light-100">Apply</span>
                            <FiArrowUpRight className="text-2xl" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterDropdown;