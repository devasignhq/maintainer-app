"use client";

type TaskCardProps = {
    issueNumber: number;
    label: string;
    bounty: string;
    title: string;
    active?: boolean;
    onClick?: () => void;
};

const TaskCard = ({ issueNumber, label, bounty, title, active, onClick }: TaskCardProps) => {
    return (
        <div 
            onClick={onClick}
            role="button"
            className={`w-full p-[15px] border space-y-2.5 cursor-pointer 
                ${active 
                    ? "bg-dark-400 border-light-100" 
                    : "border-primary-200 hover:border-dark-200 hover:bg-dark-400"}
            `}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <p className="text-body-tiny text-primary-400">#{issueNumber}</p>
                    <div className="py-0.5 px-[7px] bg-primary-300 text-body-tiny font-bold text-light-200">{label}</div>
                </div>
                <p className="text-body-medium text-primary-400 font-bold">${bounty}</p>
            </div>
            <p className="h-10 text-body-medium text-light-100 line-clamp-2">{title}</p>
        </div>
    );
}
 
export default TaskCard;