"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { ROUTES } from "@/app/utils/data";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { UserAPI } from "@/app/services/user.service";
import { useLockFn, useRequest } from "ahooks";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/app/models/_global";
import useUserStore from "@/app/state-management/useUserStore";
import { auth } from "@/lib/firebase";
import { GithubAuthProvider, signInWithPopup, getAdditionalUserInfo } from "@firebase/auth";

export const githubProvider = new GithubAuthProvider();

const Account = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setCurrentUser } = useUserStore();

    const getInstallation = () => {
        const installationId = searchParams.get("installation_id");
        if (installationId) {
            router.push(ROUTES.INSTALLATION.CREATE + `?installation_id=${installationId}`);
        }
    };

    const { loading: creatingUser, run: createUser } = useRequest(
        useLockFn((gitHubUsername: string) => UserAPI.createUser({ gitHubUsername })), 
        {
            manual: true,
            onSuccess: (data, params) => {
                toast.success("User created successfully.");
                if (data) {
                    setCurrentUser({ ...data, username: params[0] });
                }
                getInstallation();
                router.push(ROUTES.ONBOARDING);
            },
            onError: (err) => {
                const error = err as unknown as ErrorResponse;
                if (error.error.message) {
                    toast.error(error.error.message);
                    return
                }
                toast.error("Failed to create user.");
            }
        }
    );

    const { loading: fetchingUser, run: getUser } = useRequest(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        useLockFn((gitHubUsername: string) => UserAPI.getUser({ view: "basic" })), 
        {
            manual: true,
            onSuccess: (data, params) => {
                if (data) {
                    setCurrentUser({ ...data, username: params[0] });
                }

                getInstallation();
                
                if (data?._count && data._count?.installations > 0) {
                    router.push(ROUTES.TASKS);
                    return
                }
                router.push(ROUTES.ONBOARDING);
            },
            onError: (err, params) => {
                const error = err as unknown as ErrorResponse;
                if (error.error.name === "NotFoundError") {
                    createUser(params[0]);
                    return
                }
                if (error.error.message) {
                    toast.error(error.error.message);
                    return
                }
                toast.error("Failed to fetch user.");
            }
        }
    );

    const handleGitHubAuth = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const additionalInfo = getAdditionalUserInfo(result);
            // const credential = GithubAuthProvider.credentialFromResult(result);
            
            getUser(additionalInfo!.username!);
        } catch (error) {
            toast.error("GitHub sign-in failed. Please try again.");
            console.error(error);
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
                    onClick: handleGitHubAuth,
                    disabled: creatingUser || fetchingUser, 
                }}
                extendedClassName="w-[264px]"
            />
        </div>
    );
}
 
export default Account;