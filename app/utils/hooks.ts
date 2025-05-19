import { usePathname, useSearchParams, useRouter } from "next/navigation";

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