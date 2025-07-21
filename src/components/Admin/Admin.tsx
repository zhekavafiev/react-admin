import './Admin.css'
import AdminHeader from "./Header";
import {useNavigate} from 'react-router-dom'
import AdminSidebar from "./Sidebar";
import Main from "./Main";
import {useSidebar} from "./hooks/useSidebar.tsx";

interface Admin {

}

function Admin() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
    }

    const {isCollapsed, toggle} = useSidebar()

    const className = isCollapsed
        ? 'admin-container admin-container__collapsed'
        : 'admin-container'

    return <>
        {<AdminHeader
            title={'Poison Drop'}
            short_title={'PD'}
            userName={'Евгений Вафиев'}
            setUserName={true}
            onLogout={handleLogout}
            isCollapsed={isCollapsed}
            onToggle={toggle}
        />}
        {/*{<AdminFooter/>}*/}
        <div className={className}>
            {<AdminSidebar
                isCollapsed={isCollapsed}
            />}
            {<Main
                text={isCollapsed ? 'Свернуть' : 'Развернуть'}
            />}
        </div>
    </>
}

export default Admin
