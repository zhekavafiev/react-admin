import { Fragment } from 'react'
import type {ApiResponse, Process} from "./types.ts";
import axios from "axios"
import {fetchOrderByNumber} from "../services/orderService.tsx";

interface OrderProcessesProps {
    processes: Process[],
    orderNumber: string,
    setOrderData: (value: Order) => void
}

function OrderProcesses({processes, orderNumber, setOrderData}: OrderProcessesProps) {
    return (
        <div>
            <h3 className={'order__payments__grid-table'}>Процессы</h3>
            <div className={'order__processes__grid-table'}>
                <div>ID</div><div>Время</div><div>Команда</div><div>Событие</div><div>Описание</div><div>Статус</div><div>Сообщение</div>
                {processes.map(process => (
                    <Fragment key={process.id}>
                        {getProcessRow(process, orderNumber, setOrderData)}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

function getProcessRow(process: Process, orderNumber: string, setOrderData: (value: Order) => void) {
    const splitCommand = process.command.split('\\')
    const splitEvent = process.event.split('\\')
    const status = process.status

    const sendRestartProcessRequest = (id: string) => {
        const promise = axios.post('api/v1/process_restart', {
            'processId': id
        })
        promise.then(response => {
            const apiResponse: ApiResponse<any> = response.data

            if (apiResponse.success) {
                // const order =  fetchOrderByNumber(orderNumber)
                // setOrderData(order)
            }
        }).catch(error => (
            console.log(error)
        ))
    }

    return <>  {/* React Fragment - невидимая обертка */}
        <div>{process.id}</div>
        <div>{process.dt}</div>
        <div>{splitCommand.at(-1)}</div>
        <div>{splitEvent.at(-1)}</div>
        <div>{process.description}</div>
        <div className={status === 'completed' ? 'process__status__complited'
            : status === 'failed' ? 'process__status__failed' : 'process__status__pending'}
            onClick={status === 'failed' ? () => sendRestartProcessRequest(process.id) : () => null }
        >
            {process.status}
        </div>
        <div>{process.message}</div>
    </>
}

export default OrderProcesses