"use client";
import TaskListSection from "./sections/TaskListSection";
import TaskDetailSection from "./sections/TaskDetailSection";
import TaskOverviewSection from "./sections/TaskOverviewSection";

const Tasks = () => {
    return (
        <div className="h-[calc(100dvh-123px)] flex">
            <TaskListSection />
            <TaskDetailSection />
            <TaskOverviewSection />
        </div>
    );
}
 
export default Tasks;