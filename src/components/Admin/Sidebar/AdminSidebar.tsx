import './AdminSidebar.css'

interface AdminSidebar {
    isCollapsed: boolean
}

function AdminSidebar({isCollapsed}: AdminSidebar) {
    let className = isCollapsed ? 'sidebar__line__text--collapsed' : 'sidebar__line__text'
    return <div className={'sidebar'}>
        <div className={'sidebar__line'}>
            <div>📦</div>
            <div className={className}>Заказы</div>
        </div>
    </div>
}

export default AdminSidebar
