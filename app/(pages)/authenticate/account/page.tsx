"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { ROUTES } from "@/app/utils/data";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, githubProvider } from "@/lib/firebase";
import { UserAPI } from "@/app/services/user.service";
import { useLockFn, useRequest } from "ahooks";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/app/models/_global";

const Account = () => {
    const router = useRouter();

    const { loading: creatingUser, run: createUser } = useRequest(
        useLockFn(() => UserAPI.createUser()), 
        {
            manual: true,
            // cacheKey: "user-object",
            onSuccess: () => router.push(ROUTES.SETUP_PROJECT),
            onError: () => toast.error("Failed to create user.")
        }
    );

    const { loading: fetchingUser, run: getUser } = useRequest(
        useLockFn(() => UserAPI.getUser({ view: "profile" })), 
        {
            manual: true,
            cacheKey: "user-object",
            onSuccess: () => router.push(ROUTES.SETUP_PROJECT),
            onError: (err) => {
                const error = err as unknown as ErrorResponse;
                if (error.error.name === "NotFoundError") {
                    createUser();
                }
            }
        }
    );

    const handleGitHubAuth = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);

            const credential = GithubAuthProvider.credentialFromResult(result);
            console.log(credential, "credential")
            getUser();
        } catch (error) {
            alert("GitHub sign-in failed. Please try again.");
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