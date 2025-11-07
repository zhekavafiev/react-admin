import {fetchFailedEvents, fetchOrderByNumber} from "../services/orderService.tsx";
import {useState, Fragment} from "react";
import type {FailedEvent} from "./types.ts";
import type {Order} from "../OrderSpecification/types.ts";
import './FailedEventsPage.css'
import FailedEventCommentModal from "./FailedEventCommentModal.tsx";
import "react-datepicker/dist/react-datepicker.css";
import DateRangeFilter from "../../UI/DateRange";

type ComponentType = 'orders' | 'failedEvents' | 'refund' | 'processAnalytics';

interface FailedEventsProps {
    setOrderData: (order: Order | null) => void,
    setActiveComponent: (component: ComponentType) => void
}

function FailedEvents({setOrderData, setActiveComponent}: FailedEventsProps) {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false)
    const [events, setEvents] = useState<FailedEvent[]>([])
    const [comment, setComment] = useState<string|null>(null)
    const [processId, setProcessId] = useState<string | null>(null)

    const handleApplyFilter = async (dateFrom: Date, dateTo: Date) => {
        try {
            const data = await fetchFailedEvents(dateFrom, dateTo)
            setEvents(data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            {
                isCommentModalOpen && processId && (<FailedEventCommentModal
                    processId={processId}
                    comment={comment}
                    setIsCommentModalOpen={setIsCommentModalOpen}
                    onCommentSaved={handleApplyFilter}
                />)
            }
            <DateRangeFilter
                onApply={handleApplyFilter}
            />
            {events.length > 0 && <Table
                setOrderData={setOrderData}
                setActiveComponent={setActiveComponent}
                setComment={setComment}
                setIsCommentModalOpen={setIsCommentModalOpen}
                setProcessId={setProcessId}
                events={events}
            />}
        </div>
    )
}


function Table({
   setOrderData,
   setActiveComponent,
   setComment,
   setIsCommentModalOpen,
   setProcessId,
   events
}) {
    return <div>
        <h3 className={'failed_events__grid-table'}>События</h3>
        <div className={'failed_events__grid-table'}>
            <div>Номер</div>
            <div>ID</div>
            <div>Номер заказа</div>
            <div>ID заказа</div>
            <div>Событие</div>
            <div>Дата</div>
            <div>Количество Успешных после</div>
            <div>Комментарий</div>
            {events.map((event, index) => (
                <Fragment key={event.id}>
                    {getRow(event, setOrderData, setActiveComponent, index, setComment, setIsCommentModalOpen, setProcessId)}
                </Fragment>
            ))}
        </div>
    </div>
}

function getRow(
    event: FailedEvent,
    setOrderData: (order: Order | null) => void,
    setActiveComponent: (component: ComponentType) => void,
    index: number,
    setComment: (comment: string | null) => void,
    setIsCommentModalOpen: (value: boolean) => void,
    setProcessId: (value: string) => void,
) {
    const clickNumber = async (number: string) => {
        const order = await fetchOrderByNumber(number)
        setOrderData(order)
        setActiveComponent('orders')
    }

    const onClickComment = (comment: string|null) => {
        setComment(comment)
        setIsCommentModalOpen(true)
        setProcessId(event.id)
    }

    return <>
        <div>{index + 1}</div>
        <div>{event.id}</div>
        <div
            className="failed_events__clickable-order"
            onClick={() => clickNumber(event.orderNumber)}
        >{event.orderNumber}</div>
        <div>{event.orderId}</div>
        <div>{event.event}</div>
        <div>{event.failedAt}</div>
        <div>{event.countEventsAfterFail}</div>
        <div
            className={'failed_events__comment-cell' + (event.comment ? ' failed_events__comment-cell--has-comment' : '')}
            onClick={() => onClickComment(event.comment)}
        >💬</div>
    </>
}

export default FailedEvents