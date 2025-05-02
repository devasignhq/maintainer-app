"use client";
import FilterDropdown from "@/app/components/Dropdown/Filter";
import { FiArrowUpRight, FiEdit3, FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import TaskCard from "./components/TaskCard";
import { useState } from "react";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { MdOutlineCancel } from "react-icons/md";
import TaskActivityCard from "./components/TaskActivityCard";

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
            <section className="grow px-5 pt-5 border-x border-dark-200"></section>
            <section className="min-w-[360px] w-[12%] h-full pt-[30px] flex flex-col">
                <div className="pl-5 pb-[30px] space-y-[30px] border-b border-dark-200">
                    <h6 className="text-headline-small text-light-100">Task Overview</h6>
                    <div className="space-y-2.5">
                        <p className="text-body-tiny text-light-100">Developer</p>
                        <div className="flex items-center gap-1">
                            <p className="text-body-large text-light-200">@lenny_malcolm</p>
                            <button onClick={() => {}}>
                                <FiArrowUpRight className="text-2xl text-primary-100 hover:text-light-100" />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        <p className="text-body-tiny text-light-100">Bounty</p>
                        <div className="flex items-center gap-1">
                            <p className="text-body-large text-light-200">$125</p>
                            <button onClick={() => {}}>
                                <FiEdit3 className="text-2xl text-primary-100 hover:text-light-100" />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        <p className="text-body-tiny text-light-100">Time Left</p>
                        <div className="flex items-center gap-1">
                            <p className="text-body-large text-light-200">1 week 5 days</p>
                            <button onClick={() => {}}>
                                <FiEdit3 className="text-2xl text-primary-100 hover:text-light-100" />
                            </button>
                        </div>
                    </div>
                    <ButtonPrimary
                        format="OUTLINE"
                        text="Delete Task"
                        sideItem={<MdOutlineCancel />}
                        attributes={{
                            onClick: () => {},
                        }}
                        extendedClassName="border-indicator-500 text-indicator-500"
                    />
                </div>
                <h6 className="pt-[30px] pl-5 text-headline-small text-light-100">Task Activities</h6>
                <div className="pl-5 pb-5 mt-[30px] overflow-y-auto space-y-[15px]">
                    {sampleTaskActivities.map((activity) => (
                        <TaskActivityCard
                            key={activity.id}
                            issueNumber={activity.issueNumber}
                            activityTitle={activity.activityTitle}
                            issueUrl={activity.issueUrl}
                            onClick={() => window.open(`https://${activity.issueUrl}`, '_blank')}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
 
export default Tasks;

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

type TaskActivity = {
    id: string;
    issueNumber: number;
    activityTitle: string;
    issueUrl: string;
    timestamp: string;
};

const sampleTaskActivities: TaskActivity[] = [
    {
        id: "1",
        issueNumber: 42,
        activityTitle: "Bounty increased to $200",
        issueUrl: "github.com/DevAsign/app-pm/issues/42",
        timestamp: "2024-05-02T10:30:00Z"
    },
    {
        id: "2",
        issueNumber: 42,
        activityTitle: "New comment added by @sarah_dev",
        issueUrl: "github.com/DevAsign/app-pm/issues/42#comment-1",
        timestamp: "2024-05-02T09:15:00Z"
    },
    {
        id: "3",
        issueNumber: 42,
        activityTitle: "Pull request submitted for review",
        issueUrl: "github.com/DevAsign/app-pm/pull/45",
        timestamp: "2024-05-02T08:45:00Z"
    },
    {
        id: "4",
        issueNumber: 42,
        activityTitle: "Task assigned to @lenny_malcolm",
        issueUrl: "github.com/DevAsign/app-pm/issues/42",
        timestamp: "2024-05-01T16:20:00Z"
    },
    {
        id: "5",
        issueNumber: 42,
        activityTitle: "Task created with $150 bounty",
        issueUrl: "github.com/DevAsign/app-pm/issues/42",
        timestamp: "2024-05-01T15:00:00Z"
    },
    {
        id: "6",
        issueNumber: 42,
        activityTitle: "Task closed by @lenny_malcolm",
        issueUrl: "github.com/DevAsign/app-pm/issues/42",
        timestamp: "2024-05-01T14:00:00Z"
    },
    {
        id: "7",
        issueNumber: 42,
        activityTitle: "Task reopened by @sarah_dev",
        issueUrl: "github.com/DevAsign/app-pm/issues/42",
        timestamp: "2024-05-01T13:00:00Z"
    }
];