import {fetchOrderByNumber, fetchRefunds} from "../services/orderService.tsx";
import {useState, useEffect, Fragment} from "react";
import type {Refund} from "./types.ts";
import type {Order} from "../OrderSpecification/types.ts";
import './RefundPage.css'
import "react-datepicker/dist/react-datepicker.css";

type ComponentType = 'orders' | 'failedEvents' | 'refund' | 'processAnalytics';

interface RefundProps {
    setOrderData: (order: Order | null) => void,
    setActiveComponent: (component: ComponentType) => void
}

function Refund({setOrderData, setActiveComponent}: RefundProps) {
    const [events, setEvents] = useState<Refund[]>([])

    const handleApplyFilter = async () => {
        try {
            const data = await fetchRefunds()
            setEvents(data)
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
        handleApplyFilter()
    }, []);

    return (
        <div>
            {events.length > 0 && <Table
                setOrderData={setOrderData}
                setActiveComponent={setActiveComponent}
                events={events}
            />}
        </div>
    )
}


function Table({
   setOrderData,
   setActiveComponent,
   setProcessId,
   events
}) {
    return <div>
        <h3 className={'refund__grid-table'}>События</h3>
        <div className={'refund__grid-table'}>
            <div>Номер</div>
            <div>ID</div>
            <div>Номер заказа</div>
            <div>ID заказа</div>
            <div>Дата</div>
            {events.map((event, index) => (
                <Fragment key={event.id}>
                    {getRow(event, setOrderData, setActiveComponent, index, setProcessId)}
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

) {
    const clickNumber = async (number: string) => {
        const order = await fetchOrderByNumber(number)
        setOrderData(order)
        setActiveComponent('orders')
    }

    return <>
        <div>{index + 1}</div>
        <div>{event.id}</div>
        <div
            className="refund__clickable-order"
            onClick={() => clickNumber(event.orderNumber)}
        >{event.orderNumber}</div>
        <div>{event.orderId}</div>
        <div>{event.dt}</div>

    </>
}

export default Refund