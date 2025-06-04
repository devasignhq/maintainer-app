import { Octokit } from "@octokit/rest";
import { IssueFilters } from "../models/github.model";

// Helper function to check if GitHub user exists
export async function checkGithubUser(username: string, githubToken: string) {
    const octokit = new Octokit({ auth: githubToken });

    const response = await octokit.rest.users.getByUsername({
        username,
    });

    return response.status === 200;
};

// Extract owner and repo from GitHub URL
// Example URL: https://github.com/owner/repo
function getOwnerAndRepo(repoUrl: string) {
    const [owner, repo] = repoUrl
        .split("https://github.com/")[1]
        .split("/");

    return [owner, repo];
}

export async function getRepoDetails(repoUrl: string, githubToken: string) {
    const octokit = new Octokit({ auth: githubToken });
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.repos.get({
        owner,
        repo,
    });

    return response.data;
};

export async function getRepoIssues(
    repoUrl: string,
    githubToken: string,
    filters?: IssueFilters,
    page: number = 1,
    perPage: number = 30,
) {
    const octokit = new Octokit({ auth: githubToken });
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.issues.listForRepo({
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

export async function getRepoIssue(
    repoUrl: string,
    githubToken: string,
    issueNumber: number
) {
    const octokit = new Octokit({ auth: githubToken });
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.issues.get({
        owner,
        repo,
        issue_number: issueNumber,
    });

    return response.data;
};

export async function updateRepoIssue(
    repoUrl: string,
    githubToken: string,
    issueNumber: number,
    title?: string,
    body?: string,
    labels?: string[],
    assignees?: string[],
    state?: "open" | "closed",
) {
    const octokit = new Octokit({ auth: githubToken });
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        title,
        body,
        state,
        labels,
        assignees
    });

    return response.data;
};

export async function getRepoLabels(repoUrl: string, githubToken: string) {
    const octokit = new Octokit({ auth: githubToken });
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.issues.listLabelsForRepo({
        owner,
        repo,
        per_page: 100,
    });

    return response.data;
};

export async function createBountyLabel(repoUrl: string, githubToken: string) {
    const octokit = new Octokit({ auth: githubToken });
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.issues.createLabel({
        owner,
        repo,
        name: "💵 Bounty",
        color: "85BB65",
        description: "Issues with a monetary reward"
    });

    return response.data;
};

export async function getBountyLabel(repoUrl: string, githubToken: string) {
    const octokit = new Octokit({ auth: githubToken });
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.issues.getLabel({
        owner,
        repo,
        name: "💵 Bounty",
    });

    return response.data;
};

export async function getRepoMilestones(repoUrl: string, githubToken: string) {
    const octokit = new Octokit({ auth: githubToken });
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const response = await octokit.issues.listMilestones({
        owner,
        repo,
        state: "open",
        per_page: 100,
        sort: "due_on",
        direction: "asc"
    });

    return response.data;
}