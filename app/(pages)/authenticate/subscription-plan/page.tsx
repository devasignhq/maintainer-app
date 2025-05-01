"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { SubscriptionPlanDto } from "@/app/models/subscription-plan.model";
import { BsLayers } from "react-icons/bs";
import { FiArrowLeft, FiArrowRight, FiLayers, FiZap } from "react-icons/fi";
import SubscriptionCard from "./SubscriptionCard";

const SubscriptionPlan = () => {
    const cardIcons: React.ReactNode[] = [
        <BsLayers key="basic" />,
        <FiLayers key="pro" />,
        <FiZap key="enterprise" />,
    ]

    return (
        <>
            <button 
                className="gradient-border-btn relative p-2.5 bg-dark-400 text-light-100 text-2xl my-[30px]"
                onClick={() => {}}
            >
                <FiArrowLeft />
            </button>
            <h1 className="text-display-large text-light-100 pb-[42px]">
                Hello, <span className="text-light-200">{" "}lenny_malcolm{" "}</span> 👋
            </h1>
            <h1 className="text-headline-medium text-light-200 pb-[15px]">
                Manage Contributors
            </h1>
            <p className="text-body-small text-light-100">
                How many contributors are working on your project?
            </p>
            <div className="w-[500px] flex flex-col py-10 gap-[15px]">
                {demoSubscriptionPlans.map((plan, index) => (
                    <SubscriptionCard 
                        key={plan.id} 
                        plan={plan}
                        active={index === 0}
                        cardAttributes={{}}
                        icon={cardIcons[index]}
                    />
                ))}
            </div>
            <ButtonPrimary
                format="SOLID"
                text="Get Started"
                sideItem={<FiArrowRight />}
                attributes={{
                    onClick: () => {},
                }}
            />
        </>
    );
}
 
export default SubscriptionPlan;

const demoSubscriptionPlans: SubscriptionPlanDto[] = [
    {
        id: "1",
        name: "Free",
        description: "Free plan for individuals",
        price: 0,
        priceString: ["$0/month", "No credit card required"],
        features: [
            "1 user",
            "Basic support",
            "Limited features",
        ],
        paid: false,
    },
    {
        id: "2",
        name: "Pro",
        description: "Pro plan for teams",
        price: 10,
        priceString: ["$10/month"],
        features: [
            "5 users",
            "Priority support",
            "Advanced features",
        ],
        paid: true,
    },
    {
        id: "3",
        name: "Enterprise",
        description: "Enterprise plan for large organizations",
        price: 50,
        priceString: ["$50/month"],
        features: [
            "Unlimited users",
            "24/7 support",
            "All features included",
        ],
        paid: true,
    },
]