import './Main.css'
import PageHeader from "./PageHeader.tsx";
import ContentArea from "./ContentArea.tsx";
import { useState, useEffect } from 'react'


interface MainProps {
    text : string
}

function Main({text}: MainProps) {

    const [orderData, setOrderData] = useState<Order | null>(null)

    return <div className={'main'}>
            <PageHeader/>
            <ContentArea
            orderData={orderData}
            setOrderData={setOrderData}
            />
    </div>
}

export default Main
