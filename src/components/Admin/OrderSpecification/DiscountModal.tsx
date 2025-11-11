interface DiscountModalProps {
    line: OrderLine,
    setModalIsOpen: (value: boolean) => void
}

function DiscountModal({line, setModalIsOpen}: DiscountModalProps) {
    const promotions=line.promotions
    return (
        <div className={'modal__background'} onClick={() => setModalIsOpen(false)}>
            <div className={'modal'} onClick={e => e.stopPropagation()}>
                <table>
                    <caption>Скидки линии номер {line.number} СКУ {line.skuCode}</caption>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Код</th>
                        <th>Имя</th>
                        <th>Скидка</th>
                        <th>Скидка в процентах</th>
                        <th>Тип</th>
                    </tr>
                    </thead>
                    <tbody>
                    {promotions.map(promotion => {
                        return <tr key={promotion.code}>
                            <td>{promotion.id}</td>
                            <td>{promotion.code}</td>
                            <td>{promotion.name}</td>
                            <td>{promotion.discount}</td>
                            <td>{promotion.discountPercent}</td>
                            <td>{promotion.type}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DiscountModal