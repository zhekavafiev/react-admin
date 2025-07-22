
interface DiscountModalProps {
    promotions: OrderLineDiscount[],
    onClose: () => void
}

function DiscountModal({promotions, onClose}: DiscountModalProps) {
    // return (
    //     <div className="modal-backdrop" onClick={onClose}>
    //         <div className="modal-content" onClick={e => e.stopPropagation()}>
    //             <button onClick={onClose}>✕</button>
    //                 <table>
    //                     <thead>
    //                     <tr>
    //                         <th>Код</th>
    //                         <th>Имя</th>
    //                         <th>Скидка</th>
    //                         <th>Скидка в процентах</th>
    //                         <th>Тип</th>
    //                     </tr>
    //                     </thead>
    //                     <tbody>
    //                     {promotions.map(promotion => {
    //                         return <tr key={promotion.code}>
    //                             <td>{promotion.code}</td>
    //                             <td>{promotion.name}</td>
    //                             <td>{promotion.discount}</td>
    //                             <td>{promotion.discountPercent}</td>
    //                             <td>{promotion.type}</td>
    //                         </tr>
    //                     })}
    //                     </tbody>
    //                 </table>
    //         </div>
    //     </div>
    // )
}

export default DiscountModal