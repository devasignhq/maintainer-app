"use client";
import { TaskDto } from "@/app/models/task.model";
import { createContext } from "react";

type ActiveTaskContextType = {
    activeTask: TaskDto | null;
    setActiveTask: React.Dispatch<React.SetStateAction<TaskDto | null>>;
    refreshActiveTask: () => void;
}

export const ActiveTaskContext = createContext<ActiveTaskContextType>({} as ActiveTaskContextType);
