"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUser } from "@/lib/firebase";
import { ROUTES } from "@/app/utils/data";
import { useAsyncEffect, useLockFn } from "ahooks";
import { InstallationAPI } from "@/app/services/installation.service";
import { githubApp } from "@/app/services/github.service";
import useInstallationStore from "@/app/state-management/useInstallationStore";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/app/models/_global";
import { useState } from "react";
import { TbProgress } from "react-icons/tb";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { MdOutlineCancel } from "react-icons/md";

type ReboundAction = "INSTALL" | "RELOAD" | "";

const Installation = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(true);
    const [reboundAction, setReboundAction] = useState<ReboundAction>("");
    
    const { 
        activeInstallation, 
        installationList,
        setActiveInstallation,
        setInstallationList
    } = useInstallationStore();

    useAsyncEffect(useLockFn(async () => {
        const user = await getCurrentUser();
        const installationId = searchParams.get("installation_id");

        if (!installationId) {
            if (user) {
                router.push(ROUTES.TASKS);
            } else {
                router.push(ROUTES.ACCOUNT);
            }
            return
        }
        
        if (!user) {
            router.push(ROUTES.ACCOUNT + `?installation_id=${installationId}`);
            return
        }

        // Check if installationId already exists in installationList
        const existingInstallation = installationList.find( (inst) => inst.id === installationId);
        if (existingInstallation) {
            setActiveInstallation(existingInstallation);
            toast.info("Installation already exists.");
            router.push(ROUTES.TASKS);
            return;
        }
        
        let octokit;
        try {
            octokit = await githubApp.getInstallationOctokit(Number(installationId));
        } catch {
            toast.error("Unable to authenticate with GitHub. Please try reinstalling the app.");
            setIsProcessing(false);
            setReboundAction("INSTALL");
            return
        }
        
        let githubInstallation;
        try {
            githubInstallation = await octokit.request(
                "GET /app/installations/{installation_id}", 
                { installation_id: Number(installationId) }
            );
            toast.info("Installation verified.");
        } catch (githubError: any) {
            if (githubError.status === 404) {
                toast.error("Installation not found. It may have been uninstalled.");
                setReboundAction("INSTALL");
            } else {
                toast.error("Failed to fetch installation details from GitHub.");
                setReboundAction("RELOAD");
            }
            setIsProcessing(false);
            return;
        }

        try {
            const response = await InstallationAPI.createInstallation({
                installationId,
                htmlUrl: githubInstallation.data.html_url,
                targetId: githubInstallation.data.target_id,
                targetType: githubInstallation.data.target_type,
                account: {
                    login: (githubInstallation.data.account! as any).login,
                    nodeId: githubInstallation.data.account!.node_id,
                    avatarUrl: githubInstallation.data.account!.avatar_url,
                    htmlUrl: githubInstallation.data.account!.html_url
                },
            });

            const noInstallations = !activeInstallation && installationList.length === 0;
            
            toast.success("Installation saved successfully.");

            if (response && "account" in response) {
                setActiveInstallation(response);
                setInstallationList([ ...installationList, response ]);
            }
            if (response && "error" in response) {
                setActiveInstallation(response.installation);
                setInstallationList([ ...installationList, response.installation ]);
                toast.warn(response.message);
            }


            if (noInstallations) {
                router.push(ROUTES.ONBOARDING + "?newInstallation=true");
            } else {
                router.push(ROUTES.TASKS);
            }
        } catch (err) {
            const error = err as ErrorResponse;
            if (error.error.message) {
                toast.error(error.error.message);
                return
            }
            toast.error("Failed to save installation. Please reload page to try again.");
            setReboundAction("RELOAD");
            setIsProcessing(false);
        }
    }), [router, searchParams]);

    return isProcessing ? (
        <div className="fixed inset-0 z-[100] bg-[#0000004D] grid place-content-center backdrop-blur-[14px] pointer-events-none">
            <div className="w-[820px] max-h-[92dvh] p-10 popup-modal relative bg-dark-500 pointer-events-auto">
                <TbProgress className="text-[44px] text-primary-400 mx-auto rotate-loading-slower" />
                <h2 className="text-headline-medium text-light-100 my-2.5 text-center">Saving Installation</h2>
                <p className="text-body-medium text-dark-100 mb-[30px] text-center">
                    Please wait while we save your installation with GitHub.
                </p>
            </div>
        </div>
    ):(
        <div className="fixed inset-0 z-[100] bg-[#0000004D] grid place-content-center backdrop-blur-[14px] pointer-events-none">
            <div className="w-[820px] max-h-[92dvh] p-10 popup-modal relative bg-dark-500 pointer-events-auto">
                <MdOutlineCancel className="text-[44px] text-indicator-500 mx-auto" />
                <h2 className="text-headline-medium text-light-100 my-2.5 text-center">Process Failed</h2>
                <p className="text-body-medium text-dark-100 mb-[30px] text-center">
                    The process was not successful. Please try again.
                </p>
                <ButtonPrimary
                    format="OUTLINE"
                    text={reboundAction === "INSTALL" ? "Reinstall GitHubApp" : "Reload Page"}
                    attributes={{
                        onClick: () => {
                            if (reboundAction === "INSTALL") {
                                router.push(ROUTES.INSTALLATION.NEW);
                            } else {
                                window.location.reload();
                            }
                        },
                    }}
                    extendedClassName="w-fit mx-auto"
                />
            </div>
        </div>
    );
}

export default Installation;