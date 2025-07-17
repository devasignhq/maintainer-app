/* eslint-disable @typescript-eslint/no-unused-vars */
import { IssueFilters, InstallationOctokit, GraphqlIssueDto } from "../models/github.model";

// Extract owner and repo from GitHub URL
function getOwnerAndRepo(repoUrl: string) {
    const [owner, repo] = repoUrl.split("/").slice(-2);
    return [owner, repo];
}

export async function getRepoIssuesWithSearch(
    repoUrl: string,
    octokit: InstallationOctokit,
    filters?: IssueFilters,
    page = 1,
    perPage = 30,
) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);
    
    let queryString = `repo:${owner}/${repo} is:issue is:open`;
    
    if (filters?.labels?.length) {
        queryString += ` ${filters.labels.map(label => `label:"${label}"`).join(' ')}`;
    }
    
    if (filters?.milestone) {
        queryString += ` milestone:"${filters.milestone}"`;
    }
    
    queryString += ` -label:"💵 Bounty"`;

    const after = page > 1 ? `after: "${btoa(`cursor:${(page - 1) * perPage}`)}",` : '';

    const query = `
        query($queryString: String!) {
            search(
                query: $queryString,
                type: ISSUE,
                first: ${perPage},
                ${after}
            ) {
                nodes {
                    ... on Issue {
                        id
                        number
                        title
                        body
                        url
                        locked
                        state
                        createdAt
                        updatedAt
                        labels(first: 20) {
                            nodes {
                                id
                                name
                                color
                                description
                            }
                        }
                        repository {
                            url
                        }
                    }
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
                issueCount
            }
        }
    `;

    const response = await octokit.graphql(query, { queryString });
    return {
        issues: (response as any)?.search?.nodes as GraphqlIssueDto[],
        hasMore: (response as any)?.search?.pageInfo?.hasNextPage as boolean
    }
}

export async function getRepoIssue(
    repoUrl: string,
    octokit: InstallationOctokit,
    issueNumber: number
) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const query = `
        query($owner: String!, $repo: String!, $issueNumber: Int!) {
            repository(owner: $owner, name: $repo) {
                issue(number: $issueNumber) {
                    id
                    number
                    title
                    body
                    bodyHTML
                    state
                    createdAt
                    updatedAt
                    closedAt
                    url
                    author {
                        login
                        avatarUrl
                        url
                    }
                    assignees(first: 10) {
                        nodes {
                            login
                            avatarUrl
                            url
                        }
                    }
                    labels(first: 20) {
                        nodes {
                            id
                            name
                            color
                            description
                        }
                    }
                    milestone {
                        id
                        title
                        description
                        dueOn
                        state
                    }
                    comments(first: 50) {
                        nodes {
                            id
                            body
                            bodyHTML
                            createdAt
                            updatedAt
                            author {
                                login
                                avatarUrl
                            }
                        }
                        totalCount
                    }
                    reactions {
                        totalCount
                    }
                    timelineItems(first: 50) {
                        nodes {
                            __typename
                            ... on IssueComment {
                                id
                                body
                                createdAt
                                author {
                                    login
                                }
                            }
                            ... on LabeledEvent {
                                id
                                createdAt
                                label {
                                    name
                                    color
                                }
                                actor {
                                    login
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const response = await octokit.graphql(query, { owner, repo, issueNumber });
    return response;
}

export async function updateRepoIssue(
    repoUrl: string,
    octokit: InstallationOctokit,
    issueId: number,
    body?: string,
    labels?: string[],
    assignees?: string[],
    state?: "open" | "closed",
) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    // Update issue mutation
    const mutation = `
        mutation($input: UpdateIssueInput!) {
            updateIssue(input: $input) {
                issue {
                    id
                    number
                    title
                    body
                    state
                    updatedAt
                    labels(first: 20) {
                        nodes {
                            id
                            name
                            color
                        }
                    }
                    assignees(first: 10) {
                        nodes {
                            login
                            avatarUrl
                        }
                    }
                }
            }
        }
    `;

    const input: any = {
        id: issueId,
    };

    if (body !== undefined) input.body = body;
    if (state !== undefined) input.state = state.toUpperCase();
    if (labels !== undefined) input.labelIds = labels; // Note: This requires label IDs, not names
    if (assignees !== undefined) input.assigneeIds = assignees; // Note: This requires user IDs, not usernames

    const response = await octokit.graphql(mutation, { input });
    return response;
}

export async function getRepoLabels(repoUrl: string, octokit: InstallationOctokit) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const query = `
        query($owner: String!, $repo: String!) {
            repository(owner: $owner, name: $repo) {
                labels(first: 100) {
                    nodes {
                        id
                        name
                        color
                        description
                        createdAt
                        updatedAt
                    }
                    totalCount
                }
            }
        }
    `;

    const response = await octokit.graphql(query, { owner, repo });
    return response;
}

export async function getRepoMilestones(repoUrl: string, octokit: InstallationOctokit) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const query = `
        query($owner: String!, $repo: String!) {
            repository(owner: $owner, name: $repo) {
                milestones(first: 100, states: OPEN, orderBy: {field: DUE_DATE, direction: ASC}) {
                    nodes {
                        id
                        title
                        description
                        state
                        number
                        createdAt
                        updatedAt
                        dueOn
                        closedAt
                        url
                        creator {
                            login
                        }
                        issues {
                            totalCount
                        }
                        pullRequests {
                            totalCount
                        }
                    }
                    totalCount
                }
            }
        }
    `;

    const response = await octokit.graphql(query, { owner, repo });
    return response;
}

export async function createIssueComment(
    repoUrl: string,
    octokit: InstallationOctokit,
    issueId: number,
    body: string
) {
    const [owner, repo] = getOwnerAndRepo(repoUrl);

    const mutation = `
        mutation($input: AddCommentInput!) {
            addComment(input: $input) {
                commentEdge {
                    node {
                        id
                        body
                        bodyHTML
                        createdAt
                        updatedAt
                        author {
                            login
                            avatarUrl
                        }
                    }
                }
            }
        }
    `;

    const input = {
        subjectId: issueId,
        body
    };

    const response = await octokit.graphql(mutation, { input });
    return response;
}

export async function updateIssueComment(
    repoUrl: string,
    octokit: InstallationOctokit,
    commentId: string, // GraphQL uses string IDs
    body: string
) {
    const mutation = `
        mutation($input: UpdateIssueCommentInput!) {
            updateIssueComment(input: $input) {
                issueComment {
                    id
                    body
                    bodyHTML
                    updatedAt
                    author {
                        login
                        avatarUrl
                    }
                }
            }
        }
    `;

    const input = {
        id: commentId,
        body
    };

    const response = await octokit.graphql(mutation, { input });
    return response;
}

export async function deleteIssueComment(
    repoUrl: string,
    octokit: InstallationOctokit,
    commentId: string // GraphQL uses string IDs
) {
    const mutation = `
        mutation($input: DeleteIssueCommentInput!) {
            deleteIssueComment(input: $input) {
                clientMutationId
            }
        }
    `;

    const input = {
        id: commentId
    };

    await octokit.graphql(mutation, { input });
    return true;
}