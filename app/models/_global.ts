export type PaginationResponse = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasMore: boolean;
}

export type ErrorResponse = {
    error: {
        name: string;
        message: string;
        details?: never;
    };
}