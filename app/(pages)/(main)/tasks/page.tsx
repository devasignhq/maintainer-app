"use client";
import FilterDropdown from "@/app/components/Dropdown/Filter";
import { FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import TaskCard from "./TaskCard";
import { useState } from "react";

export type Task = {
    id: string;
    issueNumber: number;
    label: string;
    bounty: string;
    title: string;
};

export const sampleTasks: Task[] = [
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

const Tasks = () => {
    const [activeTaskId, setActiveTaskId] = useState("1");

    return (
        <div className="h-[calc(100dvh-123px)] flex">
            <section className="min-w-[360px] w-[12%] h-full pt-[30px] flex flex-col">
                <div className="pr-5 flex items-center gap-2.5">
                    <div className="h-full w-full relative">
                        <FiSearch className="text-xl text-light-100 absolute top-1/2 -translate-y-1/2 left-2.5" />
                        <input
                            type="text"
                            placeholder="Search Tasks or Issues"
                            className="w-full h-full p-2.5 pl-10 bg-dark-400 border border-dark-100 text-body-tiny text-light-100"
                        />
                    </div>
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
                    <p className="flex items-center gap-[5px] text-headline-small text-light-100">Project Tasks</p>
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
            <section className="grow px-5 pt-5 border-x border-dark-200"></section>
            <section className="min-w-[360px] w-[12%] pl-5 pt-[30px]"></section>
        </div>
    );
}
 
export default Tasks;