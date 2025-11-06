export interface FailedEvent {
    countEventsAfterFail: number,
    event: string,
    failedAt: string,
    id: string,
    orderId: string,
    orderNumber: string,
    comment: string | null
}