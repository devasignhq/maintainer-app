export type SubscriptionPlanDto = {
    id: string;
    name: string;
    description: string;
    price: number;
    priceString: [string, string] | [string];
    features: string[];
    paid: boolean;
}