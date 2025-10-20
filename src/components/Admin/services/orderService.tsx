import axios from 'axios'
import type {Order, ApiResponse} from '../OrderSpecification/types'
import type {FailedEvent} from "../FailedEvents/types.ts";

export const fetchOrderByNumber: Promise<Order> = async (orderNumber: string) => {
    const response =  await axios.get(`/api/v1/order/specification?orderNumber=${orderNumber}`, {
        validateStatus: () => true
    })

    const apiResponse: ApiResponse<Order | []> = response.data

    if (apiResponse.success) {
        return apiResponse.data
    } else {
        throw Error(apiResponse.message)
    }
}

export const fetchFailedEvents: Promise<FailedEvent[]> = async () => {
    const response =  await axios.get(`/api/v1/orders/failed_events`, {
        validateStatus: () => true
    })

    const apiResponse: ApiResponse<FailedEvent[]> = response.data

    if (apiResponse.success) {
        return apiResponse.data
    } else {
        throw Error(apiResponse.message)
    }
}