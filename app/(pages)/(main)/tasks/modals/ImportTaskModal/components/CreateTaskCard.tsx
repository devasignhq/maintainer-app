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
import { twMerge } from "tailwind-merge";

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
    disableFields: boolean;
    uploadStatus?: "PENDING" | "CREATED" | "FAILED";
}

const CreateTaskCard = ({
    issue,
    defaultSelected,
    showFields,
    onToggleCheck,
    disableFields,
    uploadStatus
}: CreateTaskCardProps) => {
    const { activeProject } = useProjectStore();
    const [selected, setSelected] = useState(defaultSelected);
    
    useUpdateEffect(() => setSelected(defaultSelected), [defaultSelected]);
        
    // TODO: Add default values from draft tasks
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
                projectId: activeProject!.id,
                issue: {
                    id: issue.id,
                    number: issue.number,
                    title: issue.title,
                    body: issue.body || undefined,
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
        <div className={twMerge(`w-full py-3 px-[15px] border 
                ${selected 
                    ? "bg-dark-400 border-primary-200" 
                    : "border-dark-200 hover:border-light-100"}`,
                uploadStatus === "CREATED" && "border-indicator-100 task-uploaded",
                uploadStatus === "FAILED" && "border-indicator-500 task-uploaded",
                uploadStatus === "PENDING" && "animate-pulse",
            )
        }>
            <div className="flex items-center gap-[15px]">
                <p className="text-body-medium text-primary-400">#{issue.number}</p>
                <p className="text-body-medium text-light-100 truncate">{issue.title}</p>
                <button className="ml-auto" onClick={toggleSelect}>
                    {selected ? (
                        <IoIosCheckbox className="text-[18px] text-primary-100" />
                    ) : (
                        <MdOutlineCheckBoxOutlineBlank className="text-[18px] text-dark-100" />
                    )}
                </button>
            </div>
            <div className="max-w-[90%] flex item-center gap-[5px]">
                <Link 
                    href={convertGitHubApiUrlToWebUrlRegex(issue.url)} 
                    target="_blank" 
                    className="text-body-micro text-light-200 mt-[5px] max-w-[50%] truncate"
                >
                    {convertGitHubApiUrlToWebUrlRegex(issue.url)}
                </Link>
                {issue.labels?.length > 0 && (
                    <p className="py-0.5 px-[7px] bg-primary-300 text-primary-100 text-body-tiny font-bold max-w-[50%] truncate">
                        {issue.labels
                            .map(label => label.name)
                            .map((name, index, array) => 
                                index === array.length - 1 ? name : `${name}, `
                            )
                            .join('')}
                    </p>
                )}
            </div>
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
                                disabled={disableFields}
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
                                disabled={disableFields}
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
                                    style: { fontSize: "12px", lineHeight: "16px" },
                                    disabled: disableFields
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