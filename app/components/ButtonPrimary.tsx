import { twMerge } from "tailwind-merge";

type ButtonPrimaryProps = {
    format: "SOLID" | "OUTLINE";
    text: string;
    sideItem: React.ReactNode;
    attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    extendedClassName?: string;
}

const ButtonPrimary = ({
    format,
    text,
    sideItem,
    attributes = {},
    extendedClassName = "",
}: ButtonPrimaryProps) => {
    return (
        <button 
            className={twMerge(`text-button-large font-black p-2.5 hover:bg-light-100 hover:text-dark-500 flex items-center justify-center gap-[5px]
                ${format === "SOLID"
                    ? "bg-primary-100 text-dark-500"
                    : "border border-primary-100 text-primary-100"}
            `, extendedClassName)}
            {...attributes}
        >
            <span>{text}</span>
            <span className="text-2xl leading-[1]">{sideItem}</span>
        </button>
    );
}
 
export default ButtonPrimary;