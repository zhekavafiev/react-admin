import type {ApiResponse} from "../Admin/OrderSpecification/types.ts";
import type {Response, StartResponse} from "./types.ts";
import axios from 'axios'

export const fetchSessionStart = async () => {
    const response =  await axios.post(`/pd/frontend/start`, {}, {
        validateStatus: () => true
    })

    const apiResponse: ApiResponse<StartResponse> = response.data

    if (apiResponse.success) {
        return apiResponse.data
    } else {
        throw Error(apiResponse.message)
    }
}

export const fetchLike = async (sessionId: string, itemId: string, trying: int) => {
    const response =  await axios.post(`/pd/frontend/like`, {
        'sessionId': sessionId,
        'itemId': itemId,
        'trying': trying
    }, {
        validateStatus: () => true
    })

    const apiResponse: ApiResponse<Response> = response.data

    if (apiResponse.success) {
        return apiResponse.data
    } else {
        throw Error(apiResponse.message)
    }
}

export const fetchDislike = async (sessionId: string, itemId: string, trying: int) => {
    const response =  await axios.post(`/pd/frontend/dislike`, {
        'sessionId': sessionId,
        'itemId': itemId,
        'trying': trying
    }, {
        validateStatus: () => true
    })

    const apiResponse: ApiResponse<Response> = response.data

    if (apiResponse.success) {
        return apiResponse.data
    } else {
        throw Error(apiResponse.message)
    }
}