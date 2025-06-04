"use client";
import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import Image from 'next/image';
import Link from "next/link";
import RegularDropdown from "../../../../../../components/Dropdown/Regular";
import { IssueDto } from "@/app/models/github.model";
import { CreateTaskDto } from "@/app/models/task.model";
import { useState } from "react";
import { object, string, number } from 'yup';
import { useFormik } from "formik";
import useProjectStore from "@/app/state-management/useProjectStore";
import { useUpdateEffect } from "ahooks";
import { convertGitHubApiUrlToWebUrlRegex } from "@/app/utils/helper";

type TaskPayload = {
    payload: CreateTaskDto;
    valid: boolean;
}

const createTaskSchema = object({
    bounty: string().required("Required"),
    timeline: number().required("Required"),
    timelineType: string().required("Required"),
});

type CreateTaskCardProps = {
    issue: IssueDto;
    defaultSelected: boolean; 
    showFields: boolean; 
    onToggleCheck: (taskPayload: TaskPayload | null) => void;
}

const CreateTaskCard = ({
    issue,
    defaultSelected,
    showFields,
    onToggleCheck
}: CreateTaskCardProps) => {
    const { activeProject } = useProjectStore();
    const [selected, setSelected] = useState(defaultSelected);
    
    useUpdateEffect(() => setSelected(defaultSelected), [defaultSelected]);
        
    const formik = useFormik({
        initialValues: {
            bounty: "",
            timeline: undefined,
            timelineType: "WEEK",
        },
        validationSchema: createTaskSchema,
        validateOnMount: true,
        validateOnBlur: true,
        onSubmit: () => {},
    });

    const handleToggleCheck = (selected: boolean) => {
        if (selected) {
            const taskPayload: CreateTaskDto = {
                repoUrl: convertGitHubApiUrlToWebUrlRegex(issue.repository_url),
                projectId: activeProject!.id,
                issue: {
                    id: issue.id,
                    number: issue.number,
                    title: issue.title,
                    url: issue.url,
                    labels: issue.labels,
                    locked: issue.locked,
                    state: issue.state,
                    repository_url: convertGitHubApiUrlToWebUrlRegex(issue.repository_url),
                    created_at: issue.created_at,
                    updated_at: issue.updated_at
                },
                bounty: formik.values.bounty,
                timeline: formik.values.timeline,
                timelineType: formik.values.timelineType as "DAY" | "WEEK"
            };
            onToggleCheck({ payload: taskPayload, valid: formik.isValid });
        } else {
            onToggleCheck(null);
        }
    };

    const toggleSelect = () => {
        let selected = false;

        setSelected(prev => {
            selected = !prev;
            return selected;
        });
        handleToggleCheck(selected);
    };

    useUpdateEffect(() => handleToggleCheck(selected), [formik.isValid, formik.values]);

    return (
        <div className={`w-full py-3 px-[15px] border 
            ${selected 
                ? "bg-dark-400 border-primary-200" 
                : "border-dark-200 hover:border-light-100"}`
        }>
            <div className="flex items-center justify-between gap-[5px]">
                <p className="text-body-medium text-light-100 truncate">
                    {issue.title}
                </p>
                <div className="flex items-center gap-[15px]">
                    <span className="py-0.5 px-[7px] bg-primary-300 text-primary-100 text-body-tiny font-bold">bug</span>
                    <button onClick={toggleSelect}>
                        {selected ? (
                            <IoIosCheckbox className="text-[18px] text-primary-100" />
                        ) : (
                            <MdOutlineCheckBoxOutlineBlank className="text-[18px] text-dark-100" />
                        )}
                    </button>
                </div>
            </div>
            <Link 
                href={convertGitHubApiUrlToWebUrlRegex(issue.url)} 
                target="_blank" 
                className="text-body-micro text-light-200 mt-[5px]"
            >
                {convertGitHubApiUrlToWebUrlRegex(issue.url)}
            </Link>
            {showFields && (
                <div className="flex items-center gap-5 mt-2.5">
                    <div>
                        <div className="relative">
                            <Image 
                                src="/usdc.svg" 
                                alt="$" 
                                width={16}
                                height={16}
                                className="absolute top-1/2 -translate-y-1/2 left-2.5" 
                            />
                            <input
                                id="bounty"
                                name="bounty"
                                type="number"
                                placeholder="0.00"
                                step={0.01}
                                min={0.01}
                                className="w-[115px] h-full py-[7px] pl-[36px] pr-[15px] bg-dark-400 border border-dark-200 text-body-tiny text-light-100"
                                value={formik.values.bounty}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.bounty && formik.errors.bounty && (
                            <p className="text-indicator-500 text-body-tiny mt-1">{formik.errors.bounty}</p>
                        )}
                    </div>
                    <div className="relative flex gap-[7px]">
                        <div>
                            <input
                                id="timeline"
                                name="timeline"
                                type="number"
                                placeholder="0"
                                className="w-[66px] h-full py-[7px] px-[15px] bg-dark-400 border border-dark-200 text-body-tiny text-light-100"
                                value={formik.values.timeline}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.timeline && formik.errors.timeline && (
                                <p className="text-indicator-500 text-body-tiny mt-1">{formik.errors.timeline}</p>
                            )}
                        </div>
                        <div>
                            <RegularDropdown
                                defaultName="Week(s)"
                                options={[
                                    { label: "Week(s)", value: "WEEK" },
                                    { label: "Day(s)", value: "DAY" }
                                ]}
                                fieldName="label"
                                fieldValue="value"
                                buttonAttributes={{ 
                                    style: { fontSize: "12px", lineHeight: "16px" }
                                }}
                                onChange={(value) => formik.setFieldValue("timelineType", value)}
                            />
                            {formik.touched.timelineType && formik.errors.timelineType && (
                                <p className="text-indicator-500 text-body-tiny mt-1">{formik.errors.timelineType}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default CreateTaskCard;