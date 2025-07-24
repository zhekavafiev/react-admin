
interface OrderDepositModalProps {
    deposit: BoughtDeposit,
    setDepositModalIsOpen: (value: boolean) => void
}

function OrderDepositModal({deposit, setDepositModalIsOpen}: OrderDepositModalProps) {
    const parameters =deposit.parameters
    if (parameters === null) {
        return
    }

    return <div className={'modal__background'} onClick={() => setDepositModalIsOpen(false)}>
        <div className={'modal'}>
            <pre id="json">{JSON.stringify(parameters, null, 2)}</pre>
        </div>
    </div>
}

export default OrderDepositModal