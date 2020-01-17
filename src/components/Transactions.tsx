import React from 'react'
import Actions from './Actions'
import ExpandableTableBody from './ExpandableTableBody'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import animations from '../animations.module.scss'
import styles from './Transactions.module.scss'

interface ITransactionsProps{
    endpoint: string,
    block: any
}

export const transactionHasActions = (transaction:any) : boolean => {
    return transaction.trx && transaction.trx.transaction && transaction.trx.transaction.actions ? true : false
}

export const getNumberOfActions = (transactions:any[]) : number => {
    let numberOfActions:number = 0
    transactions.forEach((t) => {
        if (transactionHasActions(t)){
            numberOfActions += t.trx.transaction.actions.length
        }
    })
    return numberOfActions
}

export const Transactions = (props: ITransactionsProps) => {
    let { endpoint, block } = props
    return (
        <ReactCSSTransitionGroup 
            transitionAppear={true} 
            transitionName={animations} 
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
        >
            <table className={styles.transactions}>
                <thead>
                    <tr>
                        <th>Transaction Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {block.transactions.map( (transaction:any, index:number) => {
                    return (
                        <ExpandableTableBody key={index} isExpandable={getNumberOfActions([transaction]) > 0}>
                            <tr>
                                <td>{transaction.trx.id || transaction.trx}</td>
                                <td>{getNumberOfActions([transaction])}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <Actions endpoint={endpoint} transaction={transaction} />
                                </td>
                            </tr>
                        </ExpandableTableBody>
                    )   
                })}
            </table>
        </ReactCSSTransitionGroup>
    )
}

export default Transactions