import './AdminSidebar.css'
import {JSX} from "react";
import OrderSpecificationPage from "../OrderSpecification";

interface AdminSidebar {
    isCollapsed: boolean,
    setMainComponent: (value: JSX.Element) => void
    setCollapseSideBar: () => void
}

function AdminSidebar({isCollapsed, setMainComponent, setCollapseSideBar}: AdminSidebar) {
    let className = isCollapsed ? 'sidebar__line__text--collapsed' : 'sidebar__line__text'
    {console.log(className)}
    return <div className={'sidebar'}>
        <div className={'sidebar__line'}>
            <div onClick={() => setMainComponent(<OrderSpecificationPage setCollapseSideBar={setCollapseSideBar}/>)}>📦</div>
            <div className={className} onClick={() => setMainComponent(<OrderSpecificationPage setCollapseSideBar={setCollapseSideBar}/>)}>Заказы</div>
        </div>
    </div>
}

export default AdminSidebar
