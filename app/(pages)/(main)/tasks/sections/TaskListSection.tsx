"use client";
import FilterDropdown from "@/app/components/Dropdown/Filter";
import InputField from "@/app/components/InputField";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import TaskCard from "../components/TaskCard";

const TaskListSection = () => {
    const [activeTaskId, setActiveTaskId] = useState("1");

    return (
        <section className="min-w-[360px] w-[12%] h-full pt-[30px] flex flex-col">
            <div className="pr-5 flex items-center gap-2.5">
                <InputField 
                    Icon={FiSearch}
                    attributes={{
                        placeholder: "Search Tasks or Issues",
                        name: "search",
                        style: { fontSize: "12px" },
                    }}
                    extendedContainerClassName="h-full w-full"
                    extendedInputClassName="h-full text-body-tiny text-light-100"
                />
                <FilterDropdown 
                    title="Labels"
                    options={["bug", "feature", "enhancement", "question"]}
                />
                {/* <FilterDropdown 
                    title="Milestones"
                    options={["Q1", "Launch", "Dragon V2"]}
                /> */}
            </div>
            <div className="pr-5 flex items-center justify-between my-[30px]">
                <h6 className="text-headline-small text-light-100">Project Tasks</h6>
                <button 
                    className="flex items-center gap-[5px] text-primary-100 text-button-large font-extrabold hover:text-light-100"
                    onClick={() => {}}
                >
                    <span>Import Tasks</span>
                    <HiPlus className="text-2xl" />
                </button>
            </div>
            <div className="grow pr-5 pb-5 overflow-y-auto space-y-[15px]">
                {sampleTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        issueNumber={task.issueNumber}
                        label={task.label}
                        bounty={task.bounty}
                        title={task.title}
                        active={activeTaskId === task.id}
                        onClick={() => setActiveTaskId(task.id)}
                    />
                ))}
            </div>
        </section>
    );
}
 
export default TaskListSection;

type Task = {
    id: string;
    issueNumber: number;
    label: string;
    bounty: string;
    title: string;
};

const sampleTasks: Task[] = [
    {
        id: "1",
        issueNumber: 42,
        label: "bug",
        bounty: "150",
        title: "Fix authentication token refresh mechanism"
    },
    {
        id: "2",
        issueNumber: 43,
        label: "feature",
        bounty: "300",
        title: "Implement dark mode toggle with system preference detection"
    },
    {
        id: "3",
        issueNumber: 44,
        label: "enhancement",
        bounty: "200",
        title: "Optimize image loading performance on dashboard"
    },
    {
        id: "4",
        issueNumber: 45,
        label: "bug",
        bounty: "175",
        title: "Fix mobile responsive layout issues in project cards"
    },
    {
        id: "5",
        issueNumber: 46,
        label: "feature",
        bounty: "500",
        title: "Add real-time collaboration features to project workspace"
    },
    {
        id: "6",
        issueNumber: 47,
        label: "enhancement",
        bounty: "250",
        title: "Improve code quality and maintainability in the codebase"
    },
    {
        id: "7",
        issueNumber: 48,
        label: "bug",
        bounty: "175",
        title: "Fix mobile responsive layout issues in project cards"
    },
    {
        id: "8",
        issueNumber: 49,
        label: "feature",
        bounty: "500",
        title: "Add real-time collaboration features to project workspace"
    },
    {
        id: "9",
        issueNumber: 50,
        label: "enhancement",
        bounty: "250",
        title: "Improve code quality and maintainability in the codebase"
    },
];