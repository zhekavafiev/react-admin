import './AdminSidebar.css'
import {JSX, useState} from "react";
import OrderSpecificationPage from "../OrderSpecification";
import FailedEvents from "../FailedEvents";
import type {Order} from "../OrderSpecification/types.ts";

interface AdminSidebar {
    isCollapsed: boolean,
    setMainComponent: (value: JSX.Element) => void
    setCollapseSideBar: () => void
}

function AdminSidebar({isCollapsed, setMainComponent, setCollapseSideBar}: AdminSidebar) {
    const [orderData, setOrderData] = useState<Order | null>(null)

    let className = isCollapsed ? 'sidebar__line__text--collapsed' : 'sidebar__line__text'

    const onClickOrder = () => {
        setMainComponent(
            <OrderSpecificationPage
                setCollapseSideBar={setCollapseSideBar}
                orderData={orderData}
                setOrderData={setOrderData}
            />)
    }

    const onClickFailedEvents = () => {
        setMainComponent(<FailedEvents
            setCollapseSideBar={setCollapseSideBar}
            setOrderData={setOrderData}
            setMainComponent={setMainComponent}
        />)
    }

    return <div className={'sidebar'}>
        <div className={'sidebar__line'}>
            <div onClick={() => onClickOrder()}>📦</div>
            <div className={className} onClick={() => onClickOrder()}>Заказы</div>
        </div>

        <div className={'sidebar__line'}>
            <div onClick={() => onClickFailedEvents()}>❗</div>
            <div className={className} onClick={() => onClickFailedEvents()}>Ошибки</div>
        </div>
    </div>
}

export default AdminSidebar
