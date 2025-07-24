import React from 'react'
import { Fragment } from 'react'

interface OrderProcessesProps {
    processes: Process[]
}

function OrderProcesses({processes}: OrderProcessesProps) {
    return (
        <div>
            <h3 className={'order__payments__grid-table'}>Процессы</h3>
            <div className={'order__processes__grid-table'}>
                <div>ID</div><div>Время</div><div>Команда</div><div>Событие</div><div>Описание</div><div>Статус</div><div>Сообщение</div>
                {processes.map(process => (
                    <Fragment key={process.id}>
                        {getProcessRow(process)}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

function getProcessRow(process: Process) {
    const splitCommand = process.command.split('\\')
    const splitEvent = process.event.split('\\')
    const status = process.status

    return <>  {/* React Fragment - невидимая обертка */}
        <div>{process.id}</div>
        <div>{process.dt}</div>
        <div>{splitCommand.at(-1)}</div>
        <div>{splitEvent.at(-1)}</div>
        <div>{process.description}</div>
        <div className={status === 'completed' ? 'process__status__complited'
            : status === 'failed' ? 'process__status__failed' : 'process__status__pending'
        }>
            {process.status}
        </div>
        <div>{process.message}</div>
    </>
}

export default OrderProcesses