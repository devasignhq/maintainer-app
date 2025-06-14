import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import { InstallationDto } from "../models/installation.model";

type InstallationStore = {
    activeInstallation: InstallationDto | null,
    InstallationList: InstallationDto[],
    setActiveInstallation: (data: InstallationDto) => void,
    setInstallationList: (data: InstallationDto[]) => void,
    clearInstallationStore: () => void,
}

const useInstallationStore = create(
    persist<InstallationStore>(
        (set) => ({
            activeInstallation: null,
            InstallationList: [],
            setActiveInstallation: (data: InstallationDto) => {
                set({ activeInstallation: data })
            },
            setInstallationList: (data: InstallationDto[]) => {
                set({ InstallationList: data })
            },
            clearInstallationStore: () => {
                set({ activeInstallation: null, InstallationList: [] })
            },
        }),
        {
            name: '@installation',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useInstallationStore;