import './OrderSpecificationPage.css'
import { useState } from 'react'
import OrderInfo from "./OrderInfo.tsx";
import OrderProcesses from "./OrderProcesses.tsx";
import OrderLines from "./OrderLines.tsx";
import OrderPayments from "./OrderPayments.tsx";
import DiscountModal from "./DiscountModal.tsx";
import OrderLineParametersModal from "./OrderLineParametersModal.tsx";
import BoughtDeposits from "./OrderBoughtDeposits.tsx";
import OrderDepositModal from "./OrderDepositModal.tsx";
import AppliedDeposits from "./AppliedDeposits.tsx";
import Input from "./Input.tsx";
import type {Order} from './types'
import Button from "./Button.tsx";
import ProcessContextModal from "./ProcessContextModal.tsx";

interface ContentAreaProps {
    orderData: Order | null,
    setOrderData: (value: Order | null) => void
    setCollapseSideBar: () => void
}

function OrderSpecificationPageContentArea({
    orderData,
    setOrderData,
    setCollapseSideBar
}: ContentAreaProps) {
    const [orderNumber, setOrderNumber] = useState('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    console.log(errorMessage)
    return (
        <div className={'content__area'}>
            {errorMessage.length !== 0 && <Error message={errorMessage}/>}
            <div className={'content__area__header'}>
                <Input orderNumber={orderNumber} setOrderNumber={setOrderNumber}/>
                <Button
                    orderNumber={orderNumber}
                    setOrderData={setOrderData}
                    setCollapseSideBar={setCollapseSideBar}
                    setErrorMessage={setErrorMessage}
                />
            </div>
            {ShowContent(orderData, orderNumber, setOrderData)}
        </div>
    )
}

function ShowContent(orderData: Order | null, orderNumber: string, setOrderData: (value: Order) => void) {
    const [isDiscountModalOpen, setDiscountModalIsOpen] = useState<boolean>(false)
    const [isParametersModalOpen, setParametersModalIsOpen] = useState<boolean>(false)
    const [isDepositModalOpen, setDepositModalIsOpen] = useState<boolean>(false)
    const [isProcessModalOpen, setIsProcessModalOpen] = useState<boolean>(false)

    const [lineId, setLineId] = useState<number>(0)
    const [boughtDepositId, setBoughtDepositId] = useState<number>(0)
    const [processId, setProcessId] = useState<string>('')

    if (orderData === null) {
        return
    }

    const selectedProcess = getSelectedProcess(orderData, processId)
    const selectedLine = getSelectedLine(orderData, lineId)
    const selectedDeposit = getSelectedBoughtDeposit(orderData, boughtDepositId)

    return <div>
        <OrderInfo order={orderData}/>

        {orderData.orderLines.length > 0 && (<OrderLines
                lines={orderData.orderLines}
                setLineId={setLineId}
                setDiscountModalIsOpen={setDiscountModalIsOpen}
                setParametersModalIsOpen={setParametersModalIsOpen}
        />)}

        {orderData.boughtDeposit.length > 0 && (<BoughtDeposits
                deposits={orderData.boughtDeposit}
                setBoughtDepositId={setBoughtDepositId}
                setDepositModalIsOpen={setDepositModalIsOpen}
        />)}

        {orderData.appliedDeposit.length > 0 && (<AppliedDeposits deposits={orderData.appliedDeposit}/>)}

        <OrderPayments payments={orderData.payments}/>

        <OrderProcesses
            processes={orderData.processes}
            orderNumber={orderNumber}
            setOrderData={setOrderData}
            setProcessId={setProcessId}
            setContextModalIsOpen={setIsProcessModalOpen}/>

        {isDiscountModalOpen && selectedLine !== null && (<DiscountModal
                line={selectedLine}
                setModalIsOpen={setDiscountModalIsOpen}
        />)}

        {isParametersModalOpen && selectedLine !== null && (
            <OrderLineParametersModal line={selectedLine} setParametersModalIsOpen={setParametersModalIsOpen}/>
        )}

        {isDepositModalOpen && selectedDeposit!== null && (
            <OrderDepositModal deposit={selectedDeposit} setDepositModalIsOpen={setDepositModalIsOpen}/>
        )}

        {isProcessModalOpen && selectedProcess && (
            <ProcessContextModal process={selectedProcess} setContextModalIsOpen={setIsProcessModalOpen}/>
        )}
    </div>
}


function getSelectedLine(orderData: Order, lineId: number) {
    let selectedLine = null

    const selectedLines = orderData.orderLines.filter(line => line.number === lineId)
    if (selectedLines.length > 0) {
        selectedLine = selectedLines.shift()
    }

    return selectedLine
}

function getSelectedBoughtDeposit(orderData: Order, depositId: number) {
    let selectedDeposit = null

    const selectedDeposits = orderData.boughtDeposit.filter(line => line.number === depositId)
    if (selectedDeposits.length > 0) {
        selectedDeposit = selectedDeposits.shift()
    }

    return selectedDeposit
}

function getSelectedProcess(orderData: Order, processId: string) {
    let selectedProcess = null

    const selectedProcesses = orderData.processes.filter(process => process.id === processId)
    if (selectedProcesses.length > 0) {
        selectedProcess = selectedProcesses.shift()
        }

    return selectedProcess
}

function Error({message}: {message: string}) {
    return <div className={'error'}>{message}</div>
}

export default OrderSpecificationPageContentArea