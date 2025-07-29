import './types.ts'
import {fetchOrderByNumber} from "../services/orderService.tsx";
import type {Order} from "./types.ts";

interface ButtonProps {
    orderNumber: string,
    setOrderData: (value: Order) => void,
    setCollapseSideBar: () => void,
    setErrorMessage: (value: string) => void,
}

function Button({ orderNumber, setOrderData, setCollapseSideBar, setErrorMessage }: ButtonProps) {
    const fetchOrder = async () => {
        try {
            const order = await fetchOrderByNumber(orderNumber)
            setOrderData(order)
            setCollapseSideBar()
        } catch (e) {
            setErrorMessage(e.message)
        }
    }

    return <button
        className={'content__area__header__button clickable'}
        onClick={fetchOrder}
    >
        Получить данные
    </button>
}

export default Button