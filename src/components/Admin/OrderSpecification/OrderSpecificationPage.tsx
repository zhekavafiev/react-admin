import './OrderSpecificationPage.css'
import PageHeader from "./PageHeader.tsx";
import OrderSpecificationPageContentArea from "./OrderSpecificationPageContentArea.tsx";
import { useState } from 'react'
import type {Order} from './types'


interface OrderSpecificationPageProps {
    setCollapseSideBar: () => void,
    orderData: Order | null,
    setOrderData: () => void,
}

function OrderSpecificationPage({setCollapseSideBar, orderData, setOrderData}: OrderSpecificationPageProps) {

    return <div className={'main'}>
        <PageHeader/>
        <OrderSpecificationPageContentArea
            orderData={orderData}
            setOrderData={setOrderData}
            setCollapseSideBar={setCollapseSideBar}
        />
    </div>
}

export default OrderSpecificationPage
