import React from 'react'
import { Fragment } from 'react'

interface OrderPaymentsProps {
    payments: OrderPayment[]
}

function OrderPayments({payments}: OrderPaymentsProps) {
    return (
        <div>
            <h3 className={'order__payments__grid-table'}>Платежи</h3>
            <div className={'order__payments__grid-table'}>
                <div>ID</div><div>Метод</div><div>Тип</div><div>Статус</div><div>Код/Транз</div><div>Сумма</div><div>Подтвержден</div><div>Оффлайн</div><div>Драфт</div>
                {payments.map(payment => (
                    <Fragment key={payment.id}>
                        {getProcessRow(payment)}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

function getProcessRow(payment: OrderPayment) {
    return <>  {/* React Fragment - невидимая обертка */}
        <div>{payment.id}</div>
        <div>{payment.paymentMethodCode}</div>
        <div>{payment.paymentType}</div>
        <div>{payment.paymentStatus}</div>
        <div>{payment.code ?? '' + payment.transactionId ?? ''}</div>
        <div>{payment.amount}</div>
        <div className={payment.isSucceed ? 'process__status__complited' : 'process__status__failed'
        }>{payment.isSucceed ? 'Да' : 'Нет'}</div>
        <div>{payment.isOffline ? 'Да' : 'Нет'}</div>
        <div className={payment.isDraft ? 'process__status__failed' : 'process__status__complited'
        }>{payment.isDraft ? 'Да' : 'Нет'}</div>
    </>
}

export default OrderPayments