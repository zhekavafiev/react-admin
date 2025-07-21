interface ApiResponse<T> {
    success: boolean,
    data: T,
    message?: string
}

interface Order {
    id: string,
    orderNumber: string,
    userId: string,
    phone: string,
    type: string,
    status: string,
    currency: string,
    deviceClient: string,
    isOnlineDeviceClient: boolean,
    bonusPoints: number,
    pointOfContact: string,
    createdAt: string,
    communicationMethod?: string,
    hasCalculation: boolean,
    sum: number,
    finalSum: number,
    orderLines: OrderLine[],
    processes: Process[]
}

interface OrderLine {
    skuCode: string,
    price: number,
    finalPrice: number,
}

interface Process {
    id: string,
    command: string,
    event: string
    description: string,
    status: string,
    message?: string
}