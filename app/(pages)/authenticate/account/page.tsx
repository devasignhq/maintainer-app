"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { ROUTES } from "@/app/utils/data";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { UserAPI } from "@/app/services/user.service";
import { useLockFn, useRequest } from "ahooks";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/app/models/_global";
import useUserStore from "@/app/state-management/useUserStore";
import { useGitHubContext } from "@/app/layout";

const Account = () => {
    const router = useRouter();
    const { setCurrentUser } = useUserStore();
    const { handleGitHubAuth } = useGitHubContext();

    const { loading: creatingUser, run: createUser } = useRequest(
        useLockFn((gitHubUsername: string) => UserAPI.createUser({ gitHubUsername })), 
        {
            manual: true,
            onSuccess: (data) => {
                toast.success("User created successfully.");
                setCurrentUser(data!);
                router.push(ROUTES.SETUP_PROJECT);
            },
            onError: () => toast.error("Failed to create user.")
        }
    );

    const { loading: fetchingUser, run: getUser } = useRequest(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        useLockFn((gitHubUsername: string) => UserAPI.getUser({ view: "basic" })), 
        {
            manual: true,
            cacheKey: "user-object",
            onSuccess: (data) => {
                setCurrentUser(data!);
                router.push(ROUTES.SETUP_PROJECT);
            },
            onError: (err, params) => {
                const error = err as unknown as ErrorResponse;
                if (error.error.name === "NotFoundError") {
                    createUser(params[0]);
                }
            }
        }
    );

    const authenticateUser = async () => {
        const data = await handleGitHubAuth();

        if (data?.additionalInfo) {
            getUser(data.additionalInfo.username!);
        }
    };

    return (
        <div className="pt-[105px]">
            <h1 className="text-display-large text-light-100">Get Started</h1>
            <p className="text-body-medium text-dark-100 pt-[42px] pb-10">
                Login with your GitHub account to access your public <br />
                repositories and import your issues/tasks to DevAsign. After <br />
                importing, you can add bounties and manage contributor <br />
                payouts seamlessly.
            </p>
            <ButtonPrimary
                format="SOLID"
                text={
                    creatingUser
                        ? "Saving User..." 
                        : fetchingUser
                            ? "Loading User..."
                            : "Continue with GitHub"
                }
                sideItem={<FaGithub />}
                attributes={{ 
                    onClick: authenticateUser,
                    disabled: creatingUser || fetchingUser, 
                }}
                extendedClassName="w-[264px]"
            />
        </div>
    );
}
 
export default Account;