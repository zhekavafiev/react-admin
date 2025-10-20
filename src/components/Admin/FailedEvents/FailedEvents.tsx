import {fetchFailedEvents} from "../services/orderService.tsx";
import {useState, useEffect, Fragment} from "react";
import type {FailedEvent} from "./types.ts";
import './FailedEventsPage.css'

interface FailedEventsProps {
    setCollapseSideBar: () => void,
    isCollapsed: boolean,
}

function FailedEvents({setCollapseSideBar, isCollapsed}: FailedEventsProps) {
    const [events, setEvents] = useState<FailedEvent[]>([])

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchFailedEvents()
                setCollapseSideBar(! isCollapsed)
                setEvents(data)
            } catch (e) {
                console.error(e)
            }
        }

        loadEvents()
    }, [])

    return (
        <div>
            <h3 className={'failed_events__grid-table'}>События</h3>
            <div className={'failed_events__grid-table'}>
                <div>ID</div><div>Номер заказа</div><div>ID заказа</div><div>Событие</div><div>Дата</div><div>Количество Успешных после</div>
                {events.map(event => (
                    <Fragment key={event.id}>
                        {getRow(event)}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

function getRow(event: FailedEvent) {
    return <>
        <div>{event.id}</div>
        <div>{event.orderNumber}</div>
        <div>{event.orderId}</div>
        <div>{event.event}</div>
        <div>{event.failedAt}</div>
        <div>{event.countEventsAfterFail}</div>
    </>
}
export default FailedEvents
