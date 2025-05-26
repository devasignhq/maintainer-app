export type PaginationResponse = {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasMore: boolean
}

export type PaginatedResponse<T> = {
    data: T[]
    pagination: PaginationResponse
}

export type ItemWithPaginationResponse<F extends string | number | symbol, T> = Partial<PaginationResponse> & {
    [K in F]: T
}

export type ErrorResponse = {
    error: {
        name: string
        message: string
        details?: never
    }
}

export type PartialSuccessResponse<F extends string | number | symbol, T> = {
    error: unknown
    message: string
} & {
    [K in F]: T
}

export type MessageResponse = {
    message: string
}