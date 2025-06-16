import { useToggle, useClickAway, useAsyncEffect, useLockFn } from "ahooks";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Context, useContext, useRef, useState } from "react";
import useUserStore from "../state-management/useUserStore";
import useInstallationStore from "../state-management/useInstallationStore";
import useTaskStore from "../state-management/useTaskStore";
import { InstallationOctokit, RepositoryDto } from "../models/github.model";

export function useCustomSearchParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateSearchParams = (params: Record<string, string | number | boolean>) => {
        const currentSearchParams = new URLSearchParams(searchParams);

        if (Object.keys(params).length === 0) {
            return router.push(pathname);
        }

        Object.entries(params).forEach(([key, value]) => {
            currentSearchParams.set(key, value.toString());
        });

        let queryString = "";
        if (currentSearchParams.size !== 0) {
            queryString = `?${currentSearchParams.toString()}`;
        }
        const newUrl = `${pathname}${queryString}`;

        router.push(newUrl);
    };

    return { searchParams, updateSearchParams };
}

export function usePopup() {
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [openMenu, { toggle: toggleMenu }] = useToggle(false);
        
    useClickAway(() => toggleMenu(), [menuButtonRef, menuRef]);

    return {
        menuButtonRef,
        menuRef,
        openMenu,
        toggleMenu
    }
}

export function useClearStores() {
    const { clearUserStore } = useUserStore();
    const { clearInstallationStore } = useInstallationStore();
    const { clearTaskStore } = useTaskStore();

    return () => {
        clearUserStore();
        clearInstallationStore();
        clearTaskStore();
    };
}

export function useGetInstallationRepositories(OctokitContext: Context<InstallationOctokit | null>) {
    const octokit = useContext(OctokitContext);
    const [repositories, setRepositories] = useState<RepositoryDto[]>([]);
    const [loading, setLoading] = useState(false);

    useAsyncEffect(useLockFn(async () => {
        if (!octokit) return;
        setLoading(true);

        const response = await octokit.request("GET /installation/repositories");

        setRepositories(response.data.repositories);
        setLoading(false);
    }), [octokit]);

    return { repositories, loading }
}