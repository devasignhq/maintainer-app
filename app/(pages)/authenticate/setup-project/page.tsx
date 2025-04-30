"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { FiArrowRight } from "react-icons/fi";
import { useFormik } from 'formik';
import * as yup from 'yup';

const projectSchema = yup.object({
    name: yup.string().required("Project name is required"),
    description: yup.string().optional(),
});

const SubscriptionPlan = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: projectSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="pt-[105px]">
            <h1 className="text-display-large text-light-100 pb-[42px]">
                Hello, <span className="text-light-200">{" "}lenny_malcolm{" "}</span> 👋
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
                    text="Proceed"
                    sideItem={<FiArrowRight />}
                    attributes={{
                        type: "submit",
                        onClick: () => {},
                    }}
                />
            </form>
        </div>
    );
}
 
export default SubscriptionPlan;