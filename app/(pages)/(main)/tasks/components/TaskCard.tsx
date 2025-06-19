"use client";
import { TaskDto } from "@/app/models/task.model";
import { moneyFormat, taskStatusFormatter } from "@/app/utils/helper";

type TaskCardProps = {
    task: TaskDto;
    active?: boolean;
    onClick?: () => void;
};

const TaskCard = ({ task, active, onClick }: TaskCardProps) => {
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
            <div className="flex items-center gap-1.5">
                <p className="text-body-tiny text-primary-400">#{task.issue.number}</p>
                {task.issue.labels?.length > 0 && (
                    <p className="py-0.5 px-[7px] bg-primary-300 text-body-tiny font-bold text-light-200 truncate">
                        {task.issue.labels
                            .map(label => label.name)
                            .map((name, index, array) => 
                                index === array.length - 1 ? name : `${name}, `
                            )
                            .join('')}
                    </p>
                )}
                <p className="text-body-medium text-primary-400 font-bold ml-auto">{moneyFormat(task.bounty)} USDC</p>
            </div>
            <p 
                className="text-body-medium text-light-100 overflow-hidden leading-5"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    maxHeight: '2.5rem', 
                    lineHeight: '1.25rem'
                }}
            >
                {task.issue.title}
            </p>
            <div className="flex items-end justify-between mt-[15px]">
                <p className="text-body-tiny font-bold text-light-200 truncate">
                    {task.issue?.url.split("/").slice(-3)[0]}
                </p>
                {!active && (
                    <p className={`w-fit py-0.5 px-[7px] text-body-tiny font-bold ${taskStatusFormatter(task.status)[1]}`}>
                        {taskStatusFormatter(task.status)[0]}
                    </p>
                )}
            </div>
        </div>
    );
}
 
export default TaskCard;