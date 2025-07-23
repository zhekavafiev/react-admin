import './OrderSpecificationPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import OrderInfo from "./OrderInfo.tsx";
import OrderProcesses from "./OrderProcesses.tsx";
import OrderLines from "./OrderLines.tsx";
import OrderPayments from "./OrderPayments.tsx";
import DiscountModal from "./DiscountModal.tsx";

interface ContentAreaProps {
    orderData: Order | null,
    setOrderData: (value: Order | null) => void
    isModalOpen: boolean,
    setModalIsOpen: (value: boolean) => void
}

function OrderSpecificationPageContentArea({orderData, setOrderData, isModalOpen, setModalIsOpen}: ContentAreaProps) {
    const [orderNumber, setOrderNumber] = useState('')

    return (
        <div className={'content__area'}>
            <div className={'content__area__header'}>
                {getInput(orderNumber, setOrderNumber)}
                {getButton(orderNumber, setOrderData)}
            </div>
            {showContent(orderData, isModalOpen, setModalIsOpen)}
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

function showContent(orderData: Order | null, isModalOpen, setModalIsOpen) {
    const [lineId, setLineId] = useState<number>(0)

    if (orderData === null) {
        return
    }

    let selectedLine = orderData.orderLines.filter(line => line.number === lineId)

    let linePromotions = []

    if (selectedLine.length > 0) {
        linePromotions = selectedLine.pop().promotions
    }

    return <div>
        <OrderInfo order={orderData}/>

        <OrderLines lines={orderData.orderLines} setLineId={setLineId} setModalIsOpen={setModalIsOpen}/>

        <OrderPayments payments={orderData.payments}/>

        <OrderProcesses processes={orderData.processes}/>

        {isModalOpen & linePromotions.length > 0 && (
            <DiscountModal
                promotions={linePromotions}
                setModalIsOpen={setModalIsOpen}
            />
        )}
    </div>
}

export default OrderSpecificationPageContentArea