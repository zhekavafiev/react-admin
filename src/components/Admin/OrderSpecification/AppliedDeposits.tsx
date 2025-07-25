import { Fragment } from 'react'
import type {AppliedDeposit} from './types'
interface AppliedDepositsProps {
    deposits: AppliedDeposit[],
}

function AppliedDeposits({deposits}: AppliedDepositsProps) {
    return (
        <div>
            <h3 className={'order__applied__deposit__grid-table'}>Примененные сертификаты</h3>
            <div className={'order__applied__deposit__grid-table'}>
                <div>ID</div><div>Код</div><div>Размер</div>
                {deposits.map(deposit => (
                    <Fragment key={deposit.id}>
                        {getDeposits(deposit)}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

function getDeposits(
    deposit: AppliedDeposit,
) {
    return <>
        <div>{deposit.id}</div>
        <div>{deposit.code}</div>
        <div>{deposit.amount}</div>
    </>
}

export default AppliedDeposits