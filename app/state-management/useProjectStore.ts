import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import { ProjectDto } from "../models/project.model";

type ProjectStore = {
    activeProject: ProjectDto | null,
    projectList: ProjectDto[],
    setActiveProject: (data: ProjectDto) => void,
    setProjectList: (data: ProjectDto[]) => void,
    clearProjectStore: () => void,
}

const useProjectStore = create(
    persist<ProjectStore>(
        (set) => ({
            activeProject: null,
            projectList: [],
            setActiveProject: (data: ProjectDto) => {
                set({ activeProject: data })
            },
            setProjectList: (data: ProjectDto[]) => {
                set({ projectList: data })
            },
            clearProjectStore: () => {
                set({ activeProject: null, projectList: [] })
            },
        }),
        {
            name: '@project',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useProjectStore;