/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TaskListSection from "./sections/TaskListSection";
import TaskDetailSection from "./sections/TaskDetailSection";
import TaskOverviewSection from "./sections/TaskOverviewSection";
import { TaskDto } from "@/app/models/task.model";
import { createContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAsyncEffect } from "ahooks";
import { TaskAPI } from "@/app/services/task.service";

export const ActiveTaskContext = createContext<{
    activeTask: TaskDto | null;
    loadingTask: boolean;
}>({} as any);

const Tasks = () => {
    const searchParams = useSearchParams();
    const [activeTask, setActiveTask] = useState<TaskDto | null>(null);
    const [loadingTask, setLoadingTask] = useState(false);

    useAsyncEffect(async () => {
        const taskId = searchParams.get("taskId");
        if (!taskId) {
            setActiveTask(null);
            return;
        }
        
        setLoadingTask(true);

        const task = await TaskAPI.getTaskById(taskId);

        if (task) {
            setActiveTask(task);
        } else {
            setActiveTask(null);
        }

        setLoadingTask(false);
    }, [searchParams]);

    return (
        <div className="h-[calc(100dvh-123px)] flex">
            <ActiveTaskContext.Provider value={{ activeTask, loadingTask }}>
                <TaskListSection />
                <TaskDetailSection />
                <TaskOverviewSection />
            </ActiveTaskContext.Provider>
        </div>
    );
}
 
export default Tasks;