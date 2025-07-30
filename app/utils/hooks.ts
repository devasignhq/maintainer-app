import { useToggle, useClickAway, useAsyncEffect } from "ahooks";
import { usePathname, useRouter } from "next/navigation";
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
import { GitHubAPI } from "../services/github.service";

export function useCustomSearchParams() {
    const router = useRouter();
    const pathname = usePathname();

    const updateSearchParams = (params: Record<string, string | number | boolean>, override = false) => {
        const currentSearchParams = override 
            ? new URLSearchParams() 
            : new URLSearchParams(window.location.search);

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
        const currentSearchParams = new URLSearchParams(window.location.search);
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

    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

    return { searchParams, updateSearchParams, removeSearchParams };
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

export function useGetInstallationRepositories() {
    const { activeInstallation } = useInstallationStore();
    const [repositories, setRepositories] = useState<RepositoryDto[]>([]);
    const [loading, setLoading] = useState(false);

    useAsyncEffect(async () => {
        if (!activeInstallation) return;

        setLoading(true);

        const response = await GitHubAPI.getInstallationRepositories(
            activeInstallation.id
        );

        setRepositories(response);
        setLoading(false);
    }, [activeInstallation]);

    return { repositories, loading }
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