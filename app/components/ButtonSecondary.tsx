type ButtonSecondaryProps = {
    text: string;
    sideItem: React.ReactNode;
    attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const ButtonSecondary = ({
    text,
    sideItem,
    attributes = {},
}: ButtonSecondaryProps) => {
    return (
        <button 
            className="cursor-primary text-body-micro p-2.5 flex items-center justify-center gap-1.5 
                bg-dark-400 text-light-100 hover:bg-light-100 hover:text-dark-500"
            {...attributes}
        >
            <span>{text}</span>
            <span className="text-base">{sideItem}</span>
        </button>
    );
}
 
export default ButtonSecondary;