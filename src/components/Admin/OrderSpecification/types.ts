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
    payments: OrderPayment[],
    boughtDeposit: BoughtDeposit[]
}

interface OrderLine {
    number: number,
    skuCode: string,
    price: number,
    finalPrice: number,
    type: string,
    status: string,
    parameters: object | null,
    promotions: OrderLineDiscount[]
}

interface OrderLineDiscount {
    code: string,
    discount: number,
    discountPercent: number,
    name: string,
    type: string,
}

interface Process {
    id: string,
    command: string,
    event: string
    description: string,
    status: string,
    message: string | null,
    dt: string
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

interface BoughtDeposit {
    id: string,
    number: number,
    price: number,
    parameters: object | null
}