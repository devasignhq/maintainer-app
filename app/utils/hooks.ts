import { useToggle, useClickAway } from "ahooks";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useRef } from "react";
import useUserStore from "../state-management/useUserStore";
import useProjectStore from "../state-management/useProjectStore";
import useTaskStore from "../state-management/useTaskStore";

export function useCustomSearchParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateSearchParams = (params: Record<string, string | number | boolean>) => {
        const currentSearchParams = new URLSearchParams(searchParams);

        if (Object.keys(params).length === 0) {
            return router.push(pathname);
        }

        Object.keys(params).forEach((key) => {
            const value = params[key];
            if (value) {
                currentSearchParams.set(key, value.toString());
            } else {
                currentSearchParams.delete(key);
            }
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
    const { clearProjectStore } = useProjectStore();
    const { clearTaskStore } = useTaskStore();

    return () => {
        clearUserStore();
        clearProjectStore();
        clearTaskStore();
    };
}