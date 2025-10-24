import './Admin.css'
import AdminHeader from "./Header";
import {useNavigate} from 'react-router-dom'
import AdminSidebar from "./Sidebar";
import OrderSpecificationPage from "./OrderSpecification";
import FailedEvents from "./FailedEvents";
import {useSidebar} from "./hooks/useSidebar.tsx";
import {useState} from "react";
import type {Order} from "./OrderSpecification/types.ts";

type ComponentType = 'orders' | 'failedEvents';

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
                setActiveComponent={setActiveComponent}
            />

            {activeComponent === 'orders' && (
                <OrderSpecificationPage
                    setCollapseSideBar={toggle}
                    orderData={orderData}
                    setOrderData={setOrderData}
                />
            )}

            {activeComponent === 'failedEvents' && (
                <FailedEvents
                    setCollapseSideBar={toggle}
                    setOrderData={setOrderData}
                    setActiveComponent={setActiveComponent}
                />
            )}
        </div>
    </>
}

export default Admin