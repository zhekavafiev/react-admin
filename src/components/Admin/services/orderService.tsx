import axios from 'axios'
import type {Order, ApiResponse} from '../OrderSpecification/types'
import type {FailedEvent} from "../FailedEvents/types.ts";
import type {DailyProcessesStats} from "../ProcessAnalitics/types.ts";

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

export const fetchFailedEvents: Promise<FailedEvent[]> = async (from: Date, to: Date) => {
    const fromStr = from?.toISOString().split('T')[0] ?? "2025-01-01"
    const toStr = to?.toISOString().split('T')[0] ?? "2030-11-01"

    const response =  await axios.post(`/api/v1/process_failed`, {
        "from": fromStr,
        "to": toStr,
    }, {
        validateStatus: () => true
    })

    const apiResponse: ApiResponse<FailedEvent[]> = response.data

    if (apiResponse.success) {
        return apiResponse.data
    } else {
        throw Error(apiResponse.message)
    }
}

export const updateFailedEventComment = async (processId: string, comment: string): Promise<void> => {
    const response = await axios.post(`/api/v1/process_comment`, {
        processId,
        comment
    }, {
        validateStatus: () => true
    })

    const apiResponse: ApiResponse<[]> = response.data

    if (!apiResponse.success) {
        throw Error(apiResponse.message || 'Ошибка при сохранении комментария')
    }
}

export const getProcessStatistics = async (from: Date, to: Date): Promise<void> => {
    const fromStr = from?.toISOString().split('T')[0] ?? "2025-01-01"
    const toStr = to?.toISOString().split('T')[0] ?? "2030-11-01"

    const response = await axios.post(`/api/v1/process_statistics`, {
        "from": fromStr,
        "to": toStr
    }, {
        validateStatus: () => true
    })

    const apiResponse: ApiResponse<DailyProcessesStats []> = response.data

    if (!apiResponse.success) {
        throw Error(apiResponse.message || 'Ошибка при сохранении комментария')
    }

    return apiResponse.data
}