import axios from 'axios'
import type {Order, ApiResponse} from '../OrderSpecification/types'

export const fetchOrderByNumber: Promice<Order> = async (orderNumber: string) => {
    const response =  await axios.get(`/api/v1/order/specification?orderNumber=${orderNumber}`)

    const apiResponse: ApiResponse<Order> = response.data

    if (apiResponse.success) {
        return apiResponse.data
    }

}