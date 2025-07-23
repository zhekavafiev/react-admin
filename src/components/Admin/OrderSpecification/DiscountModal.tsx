
interface DiscountModalProps {
    promotions: OrderLineDiscount[],
    setModalIsOpen: (value: boolean) => void
}

function DiscountModal({promotions, setModalIsOpen}: DiscountModalProps) {
    return (
        <div className={'modal__background'} onClick={() => setModalIsOpen(false)}>
            <div className={'modal'}>
                <table>
                    <caption></caption>
                    <thead>
                    <tr>
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