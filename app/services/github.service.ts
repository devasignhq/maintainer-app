import { App } from "octokit";
import { IssueFilters, InstallationOctokit } from "../models/github.model";

export const githubApp = new App({
    appId: process.env.NEXT_PUBLIC_GITHUB_APP_ID!,
    privateKey: process.env.NEXT_PUBLIC_GITHUB_APP_PRIVATE_KEY!
});

// Helper function to check if GitHub user exists
export async function checkGithubUser(username: string, octokit: InstallationOctokit) {
    const response = await octokit.rest.users.getByUsername({
        username,
    });

    return response.status === 200;
};

// Extract owner and repo from GitHub URL
function getOwnerAndRepo(repoUrl: string) {
    const [owner, repo] = repoUrl.split("/").slice(-2);

    return [owner, repo];
}

// TODO: Use octokit.graphql in place of octokit.rest

export async function getRepoDetails(repoUrl: string, octokit: InstallationOctokit) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.rest.repos.get({
        owner,
        repo,
    });

    return response.data;
};

export async function getRepoIssues(
    repoUrl: string,
    octokit: InstallationOctokit,
    filters?: IssueFilters,
    page: number = 1,
    perPage: number = 30,
) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        state: "open",
        per_page: perPage,
        page,
        ...filters,
        labels: filters?.labels?.join(','),
        milestone: filters?.milestone
    });

    const issues = response.data.filter(issue => !issue.pull_request);

    return issues;
};

// TODO: Update later as this method will be removed by September 4th, 2025
export async function getRepoIssuesWithSearch(
    repoUrl: string,
    octokit: InstallationOctokit,
    filters?: IssueFilters,
    page: number = 1,
    perPage: number = 30,
) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);
    
    let query = `repo:${owner}/${repo} is:issue is:open`;
    
    if (filters?.labels?.length) {
        query += ` ${filters.labels.map(label => `label:"${label}"`).join(' ')}`;
    }
    
    if (filters?.milestone) {
        query += ` milestone:"${filters.milestone}"`;
    }
    
    query += ` -label:"💵 Bounty"`;

    const response = await octokit.rest.search.issuesAndPullRequests({
        q: query,
        sort: filters?.sort || 'created',
        order: filters?.direction || 'desc',
        per_page: perPage,
        page,
        advanced_search: "true",
    });

    return response.data.items;
}

export async function getRepoIssue(
    repoUrl: string,
    octokit: InstallationOctokit,
    issueNumber: number
) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.rest.issues.get({
        owner,
        repo,
        issue_number: issueNumber,
    });

    return response.data;
};

export async function updateRepoIssue(
    repoUrl: string,
    octokit: InstallationOctokit,
    issueNumber: number,
    body?: string,
    labels?: string[],
    assignees?: string[],
    state?: "open" | "closed",
) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.rest.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        body,
        state,
        labels,
        assignees
    });

    return response.data;
};

export async function getRepoLabels(repoUrl: string, octokit: InstallationOctokit) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.rest.issues.listLabelsForRepo({
        owner,
        repo,
        per_page: 100,
    });

    return response.data;
};

export async function createBountyLabel(repoUrl: string, octokit: InstallationOctokit) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.rest.issues.createLabel({
        owner,
        repo,
        name: "💵 Bounty",
        color: "85BB65",
        description: "Issues with a monetary reward"
        // description: "A bounty on DevAsign"
    });

    return response.data;
};

export async function getBountyLabel(repoUrl: string, octokit: InstallationOctokit) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.rest.issues.getLabel({
        owner,
        repo,
        name: "💵 Bounty",
    });

    return response.data;
};

export async function getRepoMilestones(repoUrl: string, octokit: InstallationOctokit) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.rest.issues.listMilestones({
        owner,
        repo,
        state: "open",
        per_page: 100,
        sort: "due_on",
        direction: "asc"
    });

    return response.data;
}