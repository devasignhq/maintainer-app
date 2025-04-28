"use client";
import { useToggle } from "ahooks";
import { IoMdArrowDropdown } from "react-icons/io";

type FilterDropdownProps = {
    title: string;
    options: string[];
}

const FilterDropdown = ({ title, options }: FilterDropdownProps) => {
    const [open, { toggle }] = useToggle(false);

    return (
        <div className="relative">
            <button 
                className="p-2.5 border border-light-200 text-button-large font-extrabold text-light-200 flex items-center gap-[5px]"
                onClick={toggle}
            >
                <span>{title}</span>
                <IoMdArrowDropdown className={`text-2xl ${open && "rotate-180"}`} />
            </button>
            {open && (
                <div className="absolute top-0 left-[calc(100%_+_7px)] px-2.5 py-[15px] max-h-[350px] bg-dark-400 
                    filter-dropdown-box shadow-[-20px_4px_40px_0px_#000000] z-[9999999] overflow-y-auto"
                >
                    <button 
                        className="text-body-tiny text-light-200 font-bold sticky top-0 pb-3 hover:text-primary-100"
                        onClick={() => {}}
                    >
                        Clear Selection
                    </button>
                    <ul className="flex flex-col gap-3 list-none items-start">
                        {options.map((option, index) => (
                            <li key={index} className="flex items-center gap-2.5">
                                <input
                                    type="checkbox"
                                    className="accent-primary-200"
                                    id={option}
                                    name={option}
                                />
                                <label htmlFor={option} className="text-body-small text-light-100">{option}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
 
export default FilterDropdown;