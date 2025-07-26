import {Fragment} from 'react'
import type {Order, Process} from "./types.ts";
import ProcessRow from "./ProcessRow.tsx";

interface OrderProcessesProps {
    processes: Process[],
    orderNumber: string,
    setOrderData: (value: Order) => void,
    setProcessId: (value: string) => void,
    setContextModalIsOpen: (value: boolean) => void,
}

function OrderProcesses({processes, orderNumber, setOrderData, setProcessId, setContextModalIsOpen}: OrderProcessesProps) {
    return (
        <div>
            <h3 className={'order__payments__grid-table'}>Процессы</h3>
            <div className={'order__processes__grid-table'}>
                <div>ID</div><div>Время</div><div>Команда</div><div>Событие</div><div>Описание</div><div>Статус</div><div>Сообщение</div>
                {processes.map(process => (
                    <Fragment key={process.id}>
                        <ProcessRow
                            process={process}
                            orderNumber={orderNumber}
                            setOrderData={setOrderData}
                            setContextModalIsOpen={setContextModalIsOpen}
                            setProcessId={setProcessId}/>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default OrderProcesses