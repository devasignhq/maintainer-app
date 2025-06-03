"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import InputField from "@/app/components/InputField";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { useGitHubContext } from "@/app/layout";
import { getRepoDetails, createBountyLabel } from "@/app/services/github.service";
import { ProjectAPI } from "@/app/services/project.service";
import useProjectStore from "@/app/state-management/useProjectStore";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { string } from "yup";

const repoUrlSchema = string()
    .matches(
        /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/,
        "Please enter a valid GitHub repository URL (e.g. https://github.com/user/repo)"
    )
    .required("Repository URL is required");

type ConnectRepositoryModalProps = {
    toggleModal: () => void;
};

const ConnectRepositoryModal = ({ toggleModal }: ConnectRepositoryModalProps) => {
    const { githubToken, reAuthenticate } = useGitHubContext();
    const { activeProject, setActiveProject } = useProjectStore();
    const [repoUrl, setRepoUrl] = useState("");
    const [importingRepo, setImportingRepo] = useState(false);
    
    const connectRepository = async () => {
        if (!activeProject?.id) return;
        if (!githubToken) {
            await reAuthenticate();
            toast.info("Try importing repository again.");
            return;
        }

        setImportingRepo(true);

        try {
            await repoUrlSchema.validate(repoUrl.trim());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.message || "Invalid repository URL");
            return;
        }

        if (activeProject.repoUrls.includes(repoUrl.trim())) {
            toast.error("Repository already connected.");
            setImportingRepo(false);
            return;
        }

        // Validate if user is an admin on the repository
        const repoDetails = await getRepoDetails(repoUrl, githubToken);
        if (!repoDetails.permissions || !repoDetails.permissions.admin) {
            toast.error("You must be an admin on the repository.");
            return;
        }

        const { repoUrls } = await ProjectAPI.connectRepository(
            activeProject.id,
            { repoUrl: repoUrl.trim() }
        );

        const completion = () => {
            setActiveProject({ ...activeProject, repoUrls });
            setImportingRepo(false);
            toast.success("Repository connected successfully!");
            toggleModal();
        };

        // TODO: Reviw to handle errors properly
        try {
            await createBountyLabel(repoUrl, githubToken);
            completion();
        } catch {
            completion();
        }
    };

    return (
        <PopupModalLayout title="Connect Project Repository" toggleModal={toggleModal}>
            <p className="mt-2.5 text-body-medium text-dark-100">
                Enter your project GitHub public repository URL to import your project tasks (issues). 
                After importing, you can add bounties and manage contributor payouts seamlessly.
            </p>
            <InputField 
                Icon={FaGithub}
                attributes={{
                    placeholder: "Project GitHub repository URL",
                    name: "",
                    value: repoUrl,
                    onChange: (e) => setRepoUrl(e.target.value)
                }}
                extendedContainerClassName="my-[30px]"
            />
            <ButtonPrimary
                format="SOLID"
                text="Let's Go!"
                sideItem={<FiArrowUpRight />}
                attributes={{
                    onClick: connectRepository,
                    disabled: !repoUrl.trim() || importingRepo
                }}
                extendedClassName="w-fit"
            />
        </PopupModalLayout>
    );
}
 
export default ConnectRepositoryModal;