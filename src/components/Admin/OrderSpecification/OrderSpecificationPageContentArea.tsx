import './OrderSpecificationPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import OrderInfo from "./OrderInfo.tsx";
import OrderProcesses from "./OrderProcesses.tsx";
import OrderLines from "./OrderLines.tsx";
import OrderPayments from "./OrderPayments.tsx";

interface ContentAreaProps {
    orderData: Order | null,
    setOrderData: (value: Order | null) => void
}

function OrderSpecificationPageContentArea({orderData, setOrderData}: ContentAreaProps) {
    const [orderNumber, setOrderNumber] = useState('')

    return (
        <div className={'content__area'}>
            <div className={'content__area__header'}>
                {getInput(orderNumber, setOrderNumber)}
                {getButton(orderNumber, setOrderData)}
            </div>
        <div>
        </div>
            {showContent(orderData)}
        </div>
    )
}

function getButton(orderNumber, setOrderData) {
    const fetchOrder = () => {
        // TODO сделать catch блок
        axios.get(`/api/v1/order/specification?orderNumber=${orderNumber}`).then(response => {
            const apiResponse: ApiResponse<Order> = response.data
            if (apiResponse.success) {
                const order: Order = apiResponse.data
                setOrderData(order)
            }
        })
    }

    return <button
        className={'content__area__header__button'}
        onClick={fetchOrder}
    >
        Получить данные
    </button>
}

function getInput(orderNumber, setOrderNumber) {
    return <input
        className={'content__area__header__input'}
        type={'text'}
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        placeholder={'Номер заказа'}
    />
}

function showContent(orderData: Order | null) {
    if (orderData === null) {
        return
    }

    return <div>
        <div>
            <OrderInfo
                order={orderData}
            />
        </div>
        <div>
            <OrderLines
                lines={orderData.orderLines}
            />
        </div>
        <div>
            <OrderPayments
                payments={orderData.payments}
            />
        </div>
        <div>
            <OrderProcesses
                processes={orderData.processes}
            />
        </div>
        {orderData.orderLines.map(line => (
            <div>{line.skuCode}: {line.finalPrice}</div>
        ))}

    </div>
}

export default OrderSpecificationPageContentArea