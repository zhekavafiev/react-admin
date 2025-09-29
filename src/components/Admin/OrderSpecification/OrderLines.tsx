import { Fragment } from 'react'
import type {OrderLine} from './types.ts'

interface OrderLinesProps {
    lines: OrderLine[],
    setLineId: (value: number) => void,
    setDiscountModalIsOpen: (value: boolean) => void
    setParametersModalIsOpen: (value: boolean) => void
}

function OrderLines({lines, setLineId, setDiscountModalIsOpen, setParametersModalIsOpen}: OrderLinesProps) {
    return (
        <div>
            <h3 className={'order__payments__grid-table'}>Товары</h3>
            <div className={'order__lines__grid-table'}>
                <div>ID</div><div>Номер</div><div>КОД</div><div>ЦЕНА</div><div>Финальная Цена</div><div>Скидка менеджера</div><div>ТИП</div><div>Статус</div><div>Параметры</div><div>Скидки</div>
                {lines.map(line => (
                    <Fragment key={line.number}>
                        {getProcessRow(line, setLineId, setDiscountModalIsOpen, setParametersModalIsOpen)}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

function getProcessRow(
    line: OrderLine,
    setLineId: (value: number) => void,
    setDiscountModalIsOpen: (values: boolean) => void,
    setParametersModalIsOpen: (value: boolean) => void
) {
    const onParametersClick = () => {
        setLineId(line.number)
        setParametersModalIsOpen(true)
    }

    const onDiscountClick = () => {
        setLineId(line.number)
        setDiscountModalIsOpen(true)
    }

    const discountCount = line.promotions.length
    return <>
        <div>{line.id}</div>
        <div>{line.number}</div>
        <div>{line.skuCode}</div>
        <div>{line.price}</div>
        <div>{line.finalPrice}</div>
        <div>{line.managerDiscount}</div>
        <div>{line.type}</div>
        <div className={line.status === 'Delivered' ? 'process__status__complited'
            : line.status === 'Cancel' ? 'process__status__failed'
            : line.status === 'return' ? 'process__status__failed'
                : 'process__status__pending'
        }>
            {line.status}
        </div>
       {
           line.parameters !== null
           ? <div className={'clickable'} onClick={() => onParametersClick()}>Параметры</div>
           : <div>Дополнительные параметры отсутствуют</div>
       }

       {
           discountCount > 0
               ? <div className={'clickable'} onClick={() => onDiscountClick()}>Скидки{`(${discountCount})`}</div>
               : <div>Скидок нет</div>
       }
    </>
}

export default OrderLines