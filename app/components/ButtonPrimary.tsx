type ButtonPrimaryProps = {
    format: "SOLID" | "OUTLINE";
    text: string;
    sideItem: React.ReactNode;
    attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const ButtonPrimary = ({
    format,
    text,
    sideItem,
    attributes = {},
}: ButtonPrimaryProps) => {
    return (
        <button 
            className={`cursor-primary text-button-large p-2.5 hover:bg-light-100 hover:text-dark-500 flex items-center gap-[5px]
                ${format === "SOLID"
                    ? "bg-primary-100 text-dark-500"
                    : "border border-primary-100 text-primary-100"}
            `}
            {...attributes}
        >
            <span>{text}</span>
            <span className="text-xl">{sideItem}</span>
        </button>
    );
}
 
export default ButtonPrimary;