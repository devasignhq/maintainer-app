"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { ROUTES } from "@/app/utils/data";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, githubProvider } from "@/lib/firebase";

const Account = () => {
    const router = useRouter();

    const handleGitHubAuth = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            console.log("GitHub Access Token:", token);
            router.push(ROUTES.SUBSCRIPTION_PLAN);
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
                text="Continue with GitHub"
                sideItem={<FaGithub />}
                attributes={{ onClick: handleGitHubAuth }}
                extendedClassName="w-[264px]"
            />
        </div>
    );
}
 
export default Account;