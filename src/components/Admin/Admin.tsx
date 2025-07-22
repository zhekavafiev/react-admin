import './Admin.css'
import AdminHeader from "./Header";
import {useNavigate} from 'react-router-dom'
import AdminSidebar from "./Sidebar";
import OrderSpecificationPage from "./OrderSpecification";
import {useSidebar} from "./hooks/useSidebar.tsx";
import {JSX, useState} from "react";

interface Admin {

}

function Admin() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
    }

    const [mainComponent, setMainComponent] = useState<JSX.Element | null>(null)

    const {isCollapsed, toggle} = useSidebar()

    const className = isCollapsed
        ? 'admin-container admin-container__collapsed'
        : 'admin-container'

    return <>
        {<AdminHeader
            title={'Poison Drop'}
            short_title={'PD'}
            setUserName={true}
            onLogout={handleLogout}
            isCollapsed={isCollapsed}
            onToggle={toggle}
        />}
        {/*{<AdminFooter/>}*/}
        <div className={className}>
            {<AdminSidebar
                isCollapsed={isCollapsed}
                setMainComponent={setMainComponent}
            />}
            {mainComponent}
        </div>
    </>
}

export default Admin
