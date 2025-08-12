import React, {Fragment} from "react";

interface OrderInfoProps {
    order: Order
}

function OrderInfo({order}: OrderInfoProps) {

    let header = ''

    if (order.isAbandoned) {
        header = 'Информация по заказу. Заказ брошен'
    } else {
        header = 'Информация по заказу'
    }
    return (
        <div>
            <h3 className={'order__payments__grid-table'}>{header}</h3>
            <div className="order__info__grid-table">
                <div>ID</div><div>{order.id}</div>
                <div>Номер</div><div>{order.orderNumber}</div>
                <div>Пользователь</div><div>{order.userId}</div>
                <div>Телефон</div><div>{order.phone}</div>
                <div>Тип</div><div>{order.type}</div>
                <div>Статус</div><div>{order.status}</div>
                <div>Валюта</div><div>{order.currency}</div>
                <div>Устройство</div><div>{order.deviceClient}</div>
                <div>Онлайн Клиент</div><div>{order.deviceClient ? 'Да' : 'Нет'}</div>
                <div>Бонусы</div><div>{order.bonusPoints}</div>
                <div>Точка контакта</div><div>{order.pointOfContact}</div>
                <div>Создан</div><div>{order.createdAt}</div>
                <div>Метод коммуникации</div><div>{order.communicationMethod}</div>
                <div>Имеется калькуляция</div><div>{order.hasCalculation  ? 'Да' : 'Нет'}</div>
                <div>Сумма</div><div>{order.sum}</div>
                <div>Финальная сумма</div><div>{order.finalSum}</div>
            </div>
        </div>
    )
}

export default OrderInfo