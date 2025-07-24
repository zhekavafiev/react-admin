
interface OrderLineParametersModalProps {
    line: OrderLine,
    setParametersModalIsOpen: (value: boolean) => void
}

function OrderLineParametersModal({line, setParametersModalIsOpen}: OrderLineParametersModalProps) {
    const parameters = line.parameters
    if (parameters === null) {
        return
    }

    return <div className={'modal__background'} onClick={() => setParametersModalIsOpen(false)}>
        <div className={'modal'}>
            <pre id="json">{JSON.stringify(parameters, null, 2)}</pre>
        </div>
    </div>
}

export default OrderLineParametersModal