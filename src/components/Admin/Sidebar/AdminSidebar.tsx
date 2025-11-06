import './AdminSidebar.css'
import type {Order} from "../OrderSpecification/types.ts";

type ComponentType = 'orders' | 'failedEvents' | 'processAnalytics';

interface AdminSidebarProps {
    isCollapsed: boolean,
    setOrderData: () => void,
    setActiveComponent: (component: ComponentType) => void
}

function AdminSidebar({
  isCollapsed,
  setOrderData,
  setActiveComponent
}: AdminSidebarProps) {

    let className = isCollapsed ? 'sidebar__line__text--collapsed' : 'sidebar__line__text'

    const onClickOrder = () => {
        setActiveComponent('orders');
        setOrderData(null)
    };

    const onClickFailedEvents = () => {
        setActiveComponent('failedEvents');
    };

    const onClickProcessAnalytics = () => {
        setActiveComponent('processAnalytics')
    }

    return <div className={'sidebar'}>
        <div className={'sidebar__line'}>
            <div onClick={onClickOrder}>📦</div>
            <div className={className} onClick={onClickOrder}>Заказы</div>
        </div>

        <div className={'sidebar__line'}>
            <div onClick={onClickFailedEvents}>❗</div>
            <div className={className} onClick={onClickFailedEvents}>Ошибки</div>
        </div>

        <div className={'sidebar__line'}>
            <div onClick={onClickProcessAnalytics}>📈</div>
            <div className={className} onClick={onClickProcessAnalytics}>Аналитика процессов</div>
        </div>
    </div>
}

export default AdminSidebar