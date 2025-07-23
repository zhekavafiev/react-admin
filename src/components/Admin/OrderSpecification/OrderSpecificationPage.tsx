import './OrderSpecificationPage.css'
import PageHeader from "./PageHeader.tsx";
import OrderSpecificationPageContentArea from "./OrderSpecificationPageContentArea.tsx";
import { useState, useEffect } from 'react'


interface OrderSpecificationPageProps {}

function OrderSpecificationPage({}: OrderSpecificationPageProps) {

    const [orderData, setOrderData] = useState<Order | null>(null)
    const [isModalOpen, setModalIsOpen] = useState<boolean>(true)
    return <div className={'main'}>
            <PageHeader/>
            <OrderSpecificationPageContentArea
                orderData={orderData}
                setOrderData={setOrderData}
                isModalOpen={isModalOpen}
                setModalIsOpen={setModalIsOpen}
            />
    </div>
}

export default OrderSpecificationPage
