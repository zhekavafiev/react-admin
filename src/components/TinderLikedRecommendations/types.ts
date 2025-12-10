export interface StartResponse {
    sessionId: string,
    product: ProductResponse
    progress: ProgressResponse
}

export interface ProductResponse {
    id: string
    name: string
    designer: string
    imageUrl: string
    productUrl: string
    price: number
}

export interface ProgressResponse {
    current: number,
    total: number,
    hasEnoughInformation: boolean
}