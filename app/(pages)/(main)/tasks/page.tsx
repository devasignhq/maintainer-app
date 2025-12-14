"use client";
import TaskListSection from "./sections/TaskListSection";
import TaskDetailSection from "./sections/TaskDetailSection";
import TaskOverviewSection from "./sections/TaskOverviewSection";
import { TaskDto } from "@/app/models/task.model";
import { useState } from "react";
import { useAsyncEffect } from "ahooks";
import { TaskAPI } from "@/app/services/task.service";
import useInstallationStore from "@/app/state-management/useInstallationStore";
import { ActiveTaskContext } from "./contexts/ActiveTaskContext";
import { useCustomSearchParams } from "@/app/utils/hooks";
import { useUnauthenticatedUserCheck } from "@/lib/firebase";

const Tasks = () => {
    useUnauthenticatedUserCheck();
    const { searchParams } = useCustomSearchParams();
    const taskId = searchParams.get("taskId");
    const { activeInstallation } = useInstallationStore();
    const [activeTask, setActiveTask] = useState<TaskDto | null>(null);
    const [loadingTask, setLoadingTask] = useState(false);

    // TODO: Implement caching
    useAsyncEffect((async () => {
        if (!taskId || !activeInstallation) {
            setActiveTask(null);
            return;
        }

        setLoadingTask(true);

        try {
            const task = await TaskAPI.getInstallationTaskById(activeInstallation.id, taskId);
            setActiveTask(task);
        } catch {
            setActiveTask(null);
        } finally {
            setLoadingTask(false);
        }
    }), [taskId, activeInstallation]);

    return (
        <div className="h-[calc(100dvh-123px)] flex">
            <ActiveTaskContext.Provider value={{ activeTask, setActiveTask }}>
                <TaskListSection />
                {!activeTask && !loadingTask && (
                    <section className="grow border-x border-dark-200 grid place-content-center">
                        <p className="text-body-medium text-light-100">
                            {searchParams.get("taskId") ? "Task not found" : "No task selected"}
                        </p>
                    </section>
                )}
                {loadingTask && (
                    <section className="grow border-x border-dark-200 grid place-content-center">
                        <p className="text-body-medium text-light-100">Loading Task...</p>
                    </section>
                )}
                {!loadingTask && activeTask && (
                    <>
                        <TaskDetailSection />
                        <TaskOverviewSection />
                    </>
                )}
            </ActiveTaskContext.Provider>
        </div>
    );
};

export default Tasks;
