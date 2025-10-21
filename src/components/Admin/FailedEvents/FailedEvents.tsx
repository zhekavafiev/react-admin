import {fetchFailedEvents, fetchOrderByNumber} from "../services/orderService.tsx";
import {useState, useEffect, Fragment} from "react";
import type {FailedEvent} from "./types.ts";
import './FailedEventsPage.css'
import OrderSpecificationPage from "../OrderSpecification";

interface FailedEventsProps {
    setCollapseSideBar: () => void,
    setOrderData: () => void,
    setMainComponent: () => void
}

function FailedEvents({setCollapseSideBar, setOrderData, setMainComponent}: FailedEventsProps) {

    setCollapseSideBar(true)

    const [events, setEvents] = useState<FailedEvent[]>([])
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchFailedEvents()
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
                        {getRow(event, setOrderData, setMainComponent, setCollapseSideBar)}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

function getRow(
    event: FailedEvent,
    setOrderData: () => void,
    setMainComponent: () => void,
    setCollapseSideBar: () => void
) {
    const clickNumber = async (number: string) => {
        const order = await fetchOrderByNumber(number)
        setOrderData(order)
        setMainComponent(<OrderSpecificationPage
            setCollapseSideBar={setCollapseSideBar}
            orderData={order}
            setOrderData={setOrderData}
        />)
        console.log(order)
    }

    return <>
        <div>{event.id}</div>
        <div
            className="failed_events__clickable-order"
            onClick={() => clickNumber(event.orderNumber)}
        >{event.orderNumber}</div>
        <div>{event.orderId}</div>
        <div>{event.event}</div>
        <div>{event.failedAt}</div>
        <div>{event.countEventsAfterFail}</div>
    </>
}

export default FailedEvents
