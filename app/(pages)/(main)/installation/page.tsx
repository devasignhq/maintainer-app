"use client";
import { getCurrentUser, useUnauthenticatedUserCheck } from "@/lib/firebase";
import { ROUTES } from "@/app/utils/data";
import { useAsyncEffect, useLockFn } from "ahooks";
import { InstallationAPI } from "@/app/services/installation.service";
import useInstallationStore from "@/app/state-management/useInstallationStore";
import { toast } from "react-toastify";
import { useState } from "react";
import { TbProgress } from "react-icons/tb";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { MdOutlineCancel } from "react-icons/md";
import { handleApiError } from "@/app/utils/helper";
import { useCustomSearchParams } from "@/app/utils/hooks";

type ReboundAction = "INSTALL" | "RELOAD" | "";

const Installation = () => {
    const router = useUnauthenticatedUserCheck();;
    const { searchParams } = useCustomSearchParams();
    const installationId = searchParams.get("installation_id");
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

        try {
            const response = await InstallationAPI.createInstallation({ installationId });
            
            toast.success("Installation saved successfully.");
            const noCurrentInstallations = !activeInstallation && installationList.length === 0;

            if (response && "account" in response) {
                setActiveInstallation(response);
                setInstallationList([ ...installationList, response ]);
            }
            if (response && "message" in response) {
                setActiveInstallation(response.installation);
                setInstallationList([ ...installationList, response.installation ]);
                toast.warn(response.message);
            }

            if (noCurrentInstallations) {
                router.push(ROUTES.ONBOARDING + "?newInstallation=true");
            } else {
                router.push(ROUTES.TASKS);
            }
        } catch (error) {
            handleApiError(error, "Failed to save installation. Please reload page to try again.");
            setReboundAction("RELOAD");
        } finally {
            setIsProcessing(false);
        }
    }), [router, installationId]);

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
    ) : (
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