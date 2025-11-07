import './Admin.css'
import AdminHeader from "./Header";
import {useNavigate} from 'react-router-dom'
import AdminSidebar from "./Sidebar";
import OrderSpecificationPage from "./OrderSpecification";
import FailedEvents from "./FailedEvents";
import {useSidebar} from "./hooks/useSidebar.tsx";
import {useState} from "react";
import type {Order} from "./OrderSpecification/types.ts";
import ProcessAnalytics from "./ProcessAnalitics";
import Refund from "./Refund";

type ComponentType = 'orders' | 'failedEvents' | 'refund' | 'processAnalytics';

function Admin() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
    }

    const {isCollapsed, toggle} = useSidebar()

    const [activeComponent, setActiveComponent] = useState<ComponentType>('orders')
    const [orderData, setOrderData] = useState<Order | null>(null)

    const className = isCollapsed
        ? 'admin-container admin-container__collapsed'
        : 'admin-container'

    console.log(activeComponent)

    return <>
        <AdminHeader
            title={'Poison Drop'}
            short_title={'PD'}
            setUserName={true}
            onLogout={handleLogout}
            isCollapsed={isCollapsed}
            onToggle={toggle}
        />

        <div className={className}>
            <AdminSidebar
                isCollapsed={isCollapsed}
                setOrderData={setOrderData}
                setActiveComponent={setActiveComponent}
            />

            {activeComponent === 'orders' && (
                <OrderSpecificationPage
                    setCollapseSideBar={toggle}
                    orderData={orderData}
                    setOrderData={setOrderData}
                />
            )}

            {activeComponent === 'processAnalytics' && (
                <ProcessAnalytics
                />
            )}

            {activeComponent === 'failedEvents' && (
                <FailedEvents
                    setOrderData={setOrderData}
                    setActiveComponent={setActiveComponent}
                />
            )}

            {activeComponent === 'refund' && (
                <Refund
                    setOrderData={setOrderData}
                    setActiveComponent={setActiveComponent}
                />
            )}
        </div>
    </>
}

export default Admin