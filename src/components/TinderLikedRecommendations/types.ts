export interface StartResponse {
    sessionId: string,
    product: StartProduct
    progress: StartProgress
}

export interface StartProduct {
    id: string
    name: string
    imageUrl: string
    productUrl: string
    price: number
}

export interface StartProgress {
    current: number,
    total: number
}