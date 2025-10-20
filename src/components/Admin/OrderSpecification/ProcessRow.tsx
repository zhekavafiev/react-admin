import type {ApiResponse, Order, Process} from "./types.ts";
import {useState} from "react";
import {fetchOrderByNumber} from "../services/orderService.tsx";
import axios from 'axios'

interface ProcessRowProps {
    process: Process,
    orderNumber: string,
    setOrderData: (value: Order) => void,
    setContextModalIsOpen: (value: boolean) => void,
    setProcessId: (value: string) => void,
}

function ProcessRow({process, orderNumber, setOrderData, setContextModalIsOpen, setProcessId} : ProcessRowProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const splitCommand = process.command.split('\\')
    const splitEvent = process.event.split('\\')
    const status = process.status
    const context = process.context

    const sendRestartProcessRequest = async (id: string, setIsLoading: (value: boolean) => void) => {
        setIsLoading(true)
        const response = await axios.post('api/v1/process_restart', {
            'processId': id
        })
        const apiResponse: ApiResponse<unknown> = response.data

        if (apiResponse.success) {
            const order = await fetchOrderByNumber(orderNumber)
            setOrderData(order)
        }
        setIsLoading(false)
    }

    const getClassName = (isLoading: boolean, status: string) => {
        if (isLoading) {
            return 'process__status__loading'
        }

        return status === 'completed' ? 'process__status__complited'
            : status === 'failed' ? 'process__status__failed clickable'
                : 'process__status__pending'
    }

    return <>  {/* React Fragment - невидимая обертка */}
        <div>{process.id}</div>
        <div>{process.dt}</div>
        <div>{splitCommand.at(-1)}</div>
        <div>{splitEvent.at(-1)}</div>
        <div>{process.description}</div>
        <div className={getClassName(isLoading, process.status)}
             onClick={status === 'failed' ? () => sendRestartProcessRequest(process.id, setIsLoading) : () => null }
        >
            {process.status}
        </div>
        <div className={context.length > 0 ? 'clickable' : ''} onClick={() => {
            setContextModalIsOpen(true)
            setProcessId(process.id)
        }}>{process.message}</div>
    </>
}

export default ProcessRow