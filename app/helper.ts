import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const ROUTES = {
    ACCOUNT: "/authenticate/account",
    SUBSCRIPTION_PLAN: "/authenticate/subscription-plan",
    ONBOARDING: "/onboarding",
    OVERVIEW: "/overview",
    TASKS: "/tasks",
    CONTRIBUTORS: "/contributors",
    WALLET: "/wallet",
    SETTINGS: {
        GENERAL: "/settings/general",
        MANAGE_TEAM: "/settings/manage-team",
        PLANS_AND_BILLINGS: "/settings/plans-and-billings",
    },
};

export const formatDateAndTime = (value: string) => {
	const dateTime = new Date(value);
	
    const day = String(dateTime.getDate()).padStart(2, '0'); // Ensure day is always 2 digits
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Ensure month is always 2 digits
    const year = dateTime.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

	const formattedTime = dateTime.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
	return `${formattedDate}, ${formattedTime}`;
}

export const formatDate = (value: string) => {
    const dateTime = new Date(value);
    const day = String(dateTime.getDate()).padStart(2, '0'); // Ensure day is always 2 digits
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Ensure month is always 2 digits
    const year = dateTime.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

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