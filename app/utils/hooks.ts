import { useToggle, useClickAway, useAsyncEffect } from "ahooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    useRef,
    useState,
    useEffect,
    EffectCallback,
    DependencyList
} from "react";
import useUserStore from "../state-management/useUserStore";
import useInstallationStore from "../state-management/useInstallationStore";
import useTaskStore from "../state-management/useTaskStore";
import { RepositoryDto } from "../models/github.model";
import { InstallationAPI } from "../services/installation.service";

export function useCustomSearchParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateSearchParams = (params: Record<string, string | number | boolean>, override = false) => {
        const currentSearchParams = override 
            ? new URLSearchParams() 
            : new URLSearchParams(searchParams);

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

    const removeSearchParams = (keys: string | string[]) => {
        const currentSearchParams = new URLSearchParams(searchParams);
        const keysToRemove = Array.isArray(keys) ? keys : [keys];

        keysToRemove.forEach(key => {
            currentSearchParams.delete(key);
        });

        let queryString = "";
        if (currentSearchParams.size !== 0) {
            queryString = `?${currentSearchParams.toString()}`;
        }
        const newUrl = `${pathname}${queryString}`;

        router.push(newUrl);
    };

    return {
        searchParams,
        updateSearchParams,
        removeSearchParams
    };
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
    };
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

export function useGetInstallationRepositories() {
    const { activeInstallation } = useInstallationStore();
    const [repositories, setRepositories] = useState<RepositoryDto[]>([]);
    const [loading, setLoading] = useState(false);

    useAsyncEffect(async () => {
        if (!activeInstallation) return;

        setLoading(true);

        try {
            const response = await InstallationAPI.getInstallationRepositories(
                activeInstallation.id
            );

            setRepositories(response.data);
        } catch { } finally {
            setLoading(false);
        }
    }, [activeInstallation]);

    return { repositories, loading };
}

export function useEffectOnce(effect: EffectCallback, deps?: DependencyList) {
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

// export function useAsyncEffectOnce
