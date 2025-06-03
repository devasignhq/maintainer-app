"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { FiArrowRight } from "react-icons/fi";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ROUTES } from "@/app/utils/data";
import { useRouter } from "next/navigation";
import useProjectStore from "@/app/state-management/useProjectStore";
import { ProjectAPI } from "@/app/services/project.service";
import { useLockFn, useRequest } from "ahooks";
import { toast } from "react-toastify";
import { CreateProjectDto } from "@/app/models/project.model";
import useUserStore from "@/app/state-management/useUserStore";

const projectSchema = yup.object({
    name: yup.string().required("Project name is required"),
    description: yup.string().optional(),
});

const SubscriptionPlan = () => {
    const router = useRouter();
    const { currentUser } = useUserStore();
    const { 
        projectList, 
        setProjectList, 
        setActiveProject 
    } = useProjectStore();

    const { loading: creatingProject, run: createProject } = useRequest(
        useLockFn((data: CreateProjectDto) => ProjectAPI.createProject(data)), 
        {
            manual: true,
            onSuccess: (data) => {
                toast.success("Project created successfully.");

                const hasProjects = projectList.length > 0;

                if (data) {
                    setActiveProject(data);
                    setProjectList([data]);
                }

                if (hasProjects) {
                    router.push(ROUTES.TASKS);
                } else {
                    router.push(ROUTES.ONBOARDING);
                }
            },
            onError: () => toast.error("Failed to create project. Please try again.")
        }
    );
    
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: projectSchema,
        onSubmit: values => createProject(values),
    });

    return (
        <div className="pt-[105px]">
            <h1 className="text-display-large text-light-100 pb-[42px]">
                Hello,<span className="text-light-200">{` ${currentUser?.username} `}</span>👋
            </h1>
            <h1 className="text-headline-medium text-light-200 mb-10">
                Let’s setup your open source project
            </h1>
            <form className="w-[484px]" onSubmit={formik.handleSubmit}>
                <div className="w-full">
                    <label htmlFor="name" className="text-body-small text-light-100">
                        <span>Project Name</span>
                        <span className="text-[#FF5C5C]">{" "}*</span>
                    </label>
                    <input 
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter project name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className="w-full py-2.5 px-[15px] mt-2.5 bg-dark-400 border border-dark-200 text-body-medium text-light-100"
                    />
                    {formik.errors.name && (
                        <p className="text-body-micro font-normal mt-1 text-[#FF5C5C]">{formik.errors.name}</p>
                    )}
                </div>
                <div className="w-full mt-[15px] mb-10">
                    <label htmlFor="description" className="text-body-small text-light-100">
                        Description (optional)
                    </label>
                    <textarea 
                        id="description"
                        name="description"
                        placeholder="Project Description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        className="w-full min-h-[120px] max-h-[250px] py-2.5 px-[15px] mt-2.5 bg-dark-400 border border-dark-200 text-body-medium text-light-100"
                    />
                </div>
                <ButtonPrimary
                    format="SOLID"
                    text={
                        creatingProject
                            ? "Creating Project..."
                            : "Proceed"
                    }
                    sideItem={<FiArrowRight />}
                    attributes={{ 
                        type: "submit",
                        disabled: creatingProject || !formik.isValid || !formik.dirty, 
                    }}
                />
            </form>
        </div>
    );
}
 
export default SubscriptionPlan;