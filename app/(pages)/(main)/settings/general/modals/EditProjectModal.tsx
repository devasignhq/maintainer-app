"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { FiArrowUpRight } from "react-icons/fi";
import { useFormik } from 'formik';
import * as yup from 'yup';

const projectSchema = yup.object({
    name: yup.string().required("Project name is required"),
    description: yup.string().optional(),
});

type EditProjectModalProps = {
    toggleModal: () => void;
};

const EditProjectModal = ({ toggleModal }: EditProjectModalProps) => {
    const formik = useFormik({
        initialValues: {
            name: "Browser Use",
            description: "We make websites accessible for AI agents by extracting all interactive elements, so agents can focus on what makes their beer taste better.",
        },
        validationSchema: projectSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    
    return (
        <PopupModalLayout title="Edit Project" toggleModal={toggleModal}>
            <form 
                className="w-full space-y-5 mt-5" 
                onSubmit={formik.handleSubmit}
            >
                <div className="w-full">
                    <label htmlFor="name" className="text-body-small text-dark-100">
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
                    <label htmlFor="description" className="text-body-small text-dark-100">
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
                <div className="flex gap-2.5">
                    <ButtonPrimary
                        format="OUTLINE"
                        text="Cancel"
                        attributes={{
                            onClick: () => {},
                            type: "button",
                        }}
                    />
                    <ButtonPrimary
                        format="SOLID"
                        text="Update Project"
                        sideItem={<FiArrowUpRight />}
                        attributes={{
                            type: "submit",
                        }}
                    />
                </div>
            </form>
        </PopupModalLayout>
    );
}
 
export default EditProjectModal;