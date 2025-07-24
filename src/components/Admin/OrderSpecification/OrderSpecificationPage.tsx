import './OrderSpecificationPage.css'
import PageHeader from "./PageHeader.tsx";
import OrderSpecificationPageContentArea from "./OrderSpecificationPageContentArea.tsx";
import { useState, useEffect } from 'react'


interface OrderSpecificationPageProps {
    setCollapseSideBar: () => void
}

function OrderSpecificationPage({setCollapseSideBar}: OrderSpecificationPageProps) {

    const [orderData, setOrderData] = useState<Order | null>(null)
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
