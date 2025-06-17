import { moneyFormat } from "./helper";

export const ROUTES = {
    ACCOUNT: "/authenticate/account",
    SUBSCRIPTION_PLAN: "/authenticate/subscription-plan",
    ONBOARDING: "/onboarding",
    OVERVIEW: "/overview",
    TASKS: "/tasks",
    // CONTRIBUTORS: "/contributors",
    WALLET: "/wallet",
    SETTINGS: {
        MANAGE_TEAM: "/settings/manage-team",
        PLANS_AND_BILLINGS: "/settings/plans-and-billings",
    },
    INSTALLATION: {
        NEW: "https://github.com/apps/dev-asign/installations/new",
        CREATE: "/installation",
    }
};

const commentCTA = "http://localhost:4000";

export const customBountyMessage = (bounty: string, taskId: string) => {
   return `\n\n\n## 💵 ${moneyFormat(bounty)} USDC Bounty\n\n### Steps to solve:\n1. **Accept task**: Follow the CTA and apply to solve this issue.\n2. **Submit work**: If your application was accepted, you'll be required to submit the link to your pull request and an optional link to a reference that will give more credibility to the work done.\n3. **Receive payment**: When your pull request is approved, 100% of the bounty is instantly transferred to your wallet.\n\n**To work on this task, [Apply here](${commentCTA}?taskId=${taskId})**` 
}