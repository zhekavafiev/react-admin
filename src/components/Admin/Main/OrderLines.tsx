import React from 'react'
import { Fragment } from 'react'

interface OrderLinesProps {
    lines: OrderLine[]
}

function OrderLines({lines}: OrderLinesProps) {
    return <div className={'order__lines__grid-table'}>
        <div>№</div><div>КОД</div><div>ЦЕНА</div><div>Финальная Цена</div><div>ТИП</div><div>Статус</div><div>Параметры</div><div>Скидки</div>
        {lines.map(line => (
            <Fragment key={line.number}>
                {getProcessRow(line)}
            </Fragment>
        ))}
    </div>
}

function getProcessRow(line: OrderLine) {
    return <>  {/* React Fragment - невидимая обертка */}
        <div>{line.number}</div>
        <div>{line.skuCode}</div>
        <div>{line.price}</div>
        <div>{line.finalPrice}</div>
        <div>{line.type}</div>
        <div className={line.status === 'Delivered' ? 'process__status__complited'
            : line.status === 'Cancel' ? 'process__status__failed'
            : line.status === 'return' ? 'process__status__failed'
                : 'process__status__pending'
        }>
            {line.status}
        </div>
        <div>Параметры</div>
        <div>Скидки</div>
    </>
}

export default OrderLines