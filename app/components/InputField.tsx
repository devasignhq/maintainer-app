"use client";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

type InputFieldProps = {
    Icon: IconType;
    attributes?: React.InputHTMLAttributes<HTMLInputElement>;
    extendedInputClassName?: string;
    extendedContainerClassName?: string;
}

const InputField = ({ Icon, attributes, extendedInputClassName, extendedContainerClassName } : InputFieldProps) => {
    return (
        <div className={twMerge("relative w-full", extendedContainerClassName)}>
            <Icon className="text-xl text-light-100 absolute top-1/2 -translate-y-1/2 left-2.5" />
            <input
                type="text"
                className={twMerge(
                    "w-full p-2.5 pl-[42px] bg-dark-400 border border-dark-100 text-body-small text-light-100", 
                    extendedInputClassName
                )}
                {...attributes}
            />
        </div>
    );
}
 
export default InputField;