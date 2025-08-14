import { Fragment } from 'react'
import type {AppliedDeposit, History} from './types'

interface HistoryProps {
    histories: History[],
    setHistoryId: (value: string) => void,
    setIsHistoryModalOpen: (value: boolean) => void
}

function History({histories, setHistoryId, setIsHistoryModalOpen}: HistoryProps) {
    return (
        <div>
            <h3 className={'history__grid-table'}>История изменений</h3>
            <div className={'history__grid-table'}>
                <div>Источник</div><div>Статус</div><div>Дата</div><div>Изменения</div>
                {histories.map(history => (
                    <Fragment key={history.id}>
                        {getHistoryRow(history, setHistoryId, setIsHistoryModalOpen)}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

function getHistoryRow(history: History, setHistoryId, setIsHistoryModalOpen) {

    const onJsonClick = () => {
        setHistoryId(history.id)
        setIsHistoryModalOpen(true)
    }

    return <>
        <div>{history.source}</div>
        <div>{history.change['changeStatus']}</div>
        <div>{history.dt}</div>
        <div className={'clickable'} onClick={() => onJsonClick()}>[JSON]</div>
    </>
}

export default History