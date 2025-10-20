import './AdminSidebar.css'
import {JSX} from "react";
import OrderSpecificationPage from "../OrderSpecification";
import FailedEvents from "../FailedEvents";

interface AdminSidebar {
    isCollapsed: boolean,
    setMainComponent: (value: JSX.Element) => void
    setCollapseSideBar: () => void
}

function AdminSidebar({isCollapsed, setMainComponent, setCollapseSideBar}: AdminSidebar) {
    let className = isCollapsed ? 'sidebar__line__text--collapsed' : 'sidebar__line__text'
    return <div className={'sidebar'}>
        <div className={'sidebar__line'}>
            <div onClick={() => setMainComponent(<OrderSpecificationPage setCollapseSideBar={setCollapseSideBar}/>)}>📦</div>
            <div className={className} onClick={() => setMainComponent(<OrderSpecificationPage setCollapseSideBar={setCollapseSideBar}/>)}>Заказы</div>
        </div>
        <div className={'sidebar__line'}>
            <div onClick={() => setMainComponent(<FailedEvents setCollapseSideBar={setCollapseSideBar} isCollapsed={isCollapsed}/>)}>❗</div>
            <div className={className} onClick={() => setMainComponent(<FailedEvents setCollapseSideBar={setCollapseSideBar} isCollapsed={isCollapsed}/>)}>Ошибки</div>
        </div>
    </div>
}

export default AdminSidebar
