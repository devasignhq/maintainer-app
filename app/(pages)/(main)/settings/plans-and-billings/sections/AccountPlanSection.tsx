"use client";
import { SubscriptionPlanDto } from "@/app/models/subscription-plan.model";
import { BsLayers } from "react-icons/bs";
import { FiLayers, FiZap } from "react-icons/fi";
import SubscriptionCard from "../components/SubscriptionCard";

const AccountPlanSection = () => {
    const cardIcons: React.ReactNode[] = [
        <BsLayers key="basic" />,
        <FiLayers key="pro" />,
        <FiZap key="enterprise" />,
    ]
    
    return (
        <>
        <section className="w-full p-[30px] space-y-[30px] border-b border-dark-200">
            <div className="space-y-2.5">
                <h5 className="text-headline-small text-light-100">Account Plan</h5>
                <p className="text-body-medium text-dark-100">
                    Invite other collaborators to help manage your project development.
                </p>
            </div>
            <div className="w-full grid grid-cols-3 gap-[30px]">
                {demoSubscriptionPlans.map((plan, index) => (
                    <SubscriptionCard 
                        key={plan.id} 
                        plan={plan}
                        active={index === 0}
                        cardAttributes={{}}
                        icon={cardIcons[index]}
                        planState={index === 1 ? "UPGRADE" : "DOWNGRADE"}
                    />
                ))}
            </div>
        </section>
        </>
    );
}
 
export default AccountPlanSection;

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