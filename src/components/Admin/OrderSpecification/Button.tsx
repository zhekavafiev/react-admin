import './types.ts'
import {fetchOrderByNumber} from "../services/orderService.tsx";

interface ButtonProps {
    orderNumber: string,
    setOrderData: (value: Order) => void,
    setCollapseSideBar: () => void
}

function Button({
    orderNumber,
    setOrderData,
    setCollapseSideBar
}: ButtonProps) {
    const fetchOrder = async () => {
        const order = await fetchOrderByNumber(orderNumber)
        setOrderData(order)
        setCollapseSideBar()
    }
    return <button
        className={'content__area__header__button'}
        onClick={() => fetchOrder()}
    >
        Получить данные
    </button>
}

export default Button