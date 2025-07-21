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
    payments: OrderPayment[]
}

interface OrderLine {
    number: number,
    skuCode: string,
    price: number,
    finalPrice: number,
    type: string,
    status: string,
    parameters?: object,
    promotions: []
}

interface Process {
    id: string,
    command: string,
    event: string
    description: string,
    status: string,
    message?: string
}

interface OrderPayment {
    id: string,
    paymentMethodCode: string,
    paymentType: string,
    paymentStatus: string,
    code: string | null,
    transactionId: string | null,
    amount: number,
    isSucceed: boolean,
    isOffline: boolean,
    isDraft: boolean
}