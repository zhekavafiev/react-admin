import './OrderSpecificationPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import OrderInfo from "./OrderInfo.tsx";
import OrderProcesses from "./OrderProcesses.tsx";
import OrderLines from "./OrderLines.tsx";
import OrderPayments from "./OrderPayments.tsx";
import DiscountModal from "./DiscountModal.tsx";
import OrderLineParametersModal from "./OrderLineParametersModal.tsx";
import BoughtDeposits from "./OrderBoughtDeposits.tsx";
import OrderDepositModal from "./OrderDepositModal.tsx";

interface ContentAreaProps {
    orderData: Order | null,
    setOrderData: (value: Order | null) => void
}

function OrderSpecificationPageContentArea({
    orderData,
    setOrderData,
}: ContentAreaProps) {
    const [orderNumber, setOrderNumber] = useState('')

    return (
        <div className={'content__area'}>
            <div className={'content__area__header'}>
                {getInput(orderNumber, setOrderNumber)}
                {getButton(orderNumber, setOrderData)}
            </div>
            {showContent(orderData)}
        </div>
    )
}

function getButton(orderNumber: string, setOrderData: (value: Order) => void) {
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

function getInput(orderNumber: string, setOrderNumber: (value: string) => void) {
    return <input
        className={'content__area__header__input'}
        type={'text'}
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        placeholder={'Номер заказа'}
    />
}

function showContent(orderData: Order | null,) {
    const [isDiscountModalOpen, setDiscountModalIsOpen] = useState<boolean>(false)
    const [isParametersModalOpen, setParametersModalIsOpen] = useState<boolean>(false)
    const [isDepositModalOpen, setDepositModalIsOpen] = useState<boolean>(false)

    const [lineId, setLineId] = useState<number>(0)
    const [boughtDepositId, setBoughtDepositId] = useState<number>(0)

    if (orderData === null) {
        return
    }

    let selectedLine = getSelectedLine(orderData, lineId)
    let selectedDeposit = getSelectedBoughtDeposit(orderData, boughtDepositId)

    return <div>
        <OrderInfo order={orderData}/>

        {
            orderData.orderLines.length > 0 && (
                <OrderLines
                    lines={orderData.orderLines}
                    setLineId={setLineId}
                    setDiscountModalIsOpen={setDiscountModalIsOpen}
                    setParametersModalIsOpen={setParametersModalIsOpen}
                />
            )
        }

        {
            orderData.boughtDeposit.length > 0 && (
                <BoughtDeposits
                    deposits={orderData.boughtDeposit}
                    setBoughtDepositId={setBoughtDepositId}
                    setDepositModalIsOpen={setDepositModalIsOpen}
                />
            )
        }

        <OrderPayments payments={orderData.payments}/>

        <OrderProcesses processes={orderData.processes}/>

        {isDiscountModalOpen & selectedLine !== null && (
            <DiscountModal
                line={selectedLine}
                setModalIsOpen={setDiscountModalIsOpen}
            />
        )}

        {isParametersModalOpen & selectedLine !== null && (
            <OrderLineParametersModal line={selectedLine} setParametersModalIsOpen={setParametersModalIsOpen}/>
        )}

        {isDepositModalOpen & selectedDeposit!== null && (
            <OrderDepositModal deposit={selectedDeposit} setDepositModalIsOpen={setDepositModalIsOpen}/>
        )}
    </div>
}


function getSelectedLine(orderData: Order, lineId: number) {
    let selectedLine = null

    let selectedLines = orderData.orderLines.filter(line => line.number === lineId)
    if (selectedLines.length > 0) {
        selectedLine = selectedLines.shift()
    }

    return selectedLine
}

function getSelectedBoughtDeposit(orderData: Order, depositId: number) {
    let selectedDeposit = null

    let selectedDeposits = orderData.boughtDeposit.filter(line => line.number === depositId)
    if (selectedDeposits.length > 0) {
        selectedDeposit = selectedDeposits.shift()
    }

    return selectedDeposit
}

export default OrderSpecificationPageContentArea