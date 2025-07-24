import React, {useState} from 'react'
import { Fragment } from 'react'

interface BoughtDepositsProps {
    deposits: BoughtDeposit[],
    setBoughtDepositId: (value: number) => void,
    setDepositModalIsOpen: (value: boolean) => void
}

function BoughtDeposits({deposits, setBoughtDepositId, setDepositModalIsOpen}: BoughtDepositsProps) {
    return (
        <div>
            <h3 className={'order__deposit__grid-table'}>Сертификаты</h3>
            <div className={'order__deposit__grid-table'}>
                <div>№</div><div>ID</div><div>ЦЕНА</div><div>Параметры</div>
                {deposits.map(deposit => (
                    <Fragment key={deposit.number}>
                        {getDeposits(deposit, setBoughtDepositId, setDepositModalIsOpen)}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

function getDeposits(
    deposit: BoughtDeposit,
    setBoughtDepositId: (value: number) => void,
    setDepositModalIsOpen: (value: boolean) => void
) {
    const hasParameters = deposit.parameters !== null
    return <>
        <div>{deposit.number}</div>
        <div>{deposit.id}</div>
        <div>{deposit.price}</div>
        {
            hasParameters
            ? <div className={'order__deposit__text'} onClick={() => {
                    setDepositModalIsOpen(true)
                    setBoughtDepositId(deposit.number)
                }}>Параметры</div>
            : <div>Параметров нет</div>
        }
    </>
}

export default BoughtDeposits