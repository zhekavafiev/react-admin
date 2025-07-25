interface InputProps {
    orderNumber: string,
    setOrderNumber: (value: string) => void
}

function Input({orderNumber, setOrderNumber}: InputProps) {
    return <input
        className={'content__area__header__input'}
        type={'text'}
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        placeholder={'Номер заказа'}
    />
}

export default Input