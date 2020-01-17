import { JsonRpc } from 'eosjs'
import { GetAbiResult } from 'eosjs/dist/eosjs-rpc-interfaces'
import { fetch } from 'node-fetch'
import React from 'react'
import { RicardianContractFactory } from 'ricardian-template-toolkit'

import ExpandableTableBody from './ExpandableTableBody'
import RicardianContractExplorer, { IRicardianContract } from './RicardianContract'
import { transactionHasActions } from './Transactions'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import animations from '../animations.module.scss'
import styles from './RicardianContract.module.scss'

interface IActionsProps {
    endpoint: string,
    transaction: any
}

const abiMap: GetAbiResult[] = []

export const getContractFromAction = async (endpoint: string, transaction: any,
                                            actionIndex: number): Promise<IRicardianContract> => {
    const rpc = new JsonRpc(endpoint, { fetch })
    const factory = new RicardianContractFactory()

    const contract: IRicardianContract = {template: 'Contract not found.'}

    let abiResult: GetAbiResult
    const action: any = transaction.trx.transaction.actions[actionIndex]

    if (abiMap[action.account]) {
        abiResult = abiMap[action.account]
    } else {
        abiResult = await rpc.get_abi(action.account)
        abiMap[action.account] = abiResult
    }

    if (abiResult && abiResult.abi && abiResult.abi.actions) {
        try {
            // Construct a RicardianContractConfig object
            const config = {
                abi: abiResult.abi,
                actionIndex,
                allowUnusedVariables: false,
                maxPasses: 5,
                transaction: transaction.trx.transaction,
                // Optional - defaults to 3
                // Optional - developer flag - if true ignore errors if a variable
                // is specified in the contract but no value is found to substitute
            }

            const ricardianContract = factory.create(config)
            const metadata = ricardianContract.getMetadata()
            const html = ricardianContract.getHtml()

            return { template: html, metaData: metadata }
        } catch (e) {
            let invalidContractData: string = ''
            if (action.data) {
                invalidContractData = JSON.stringify(transaction.trx.transaction.actions[actionIndex].data, null, 2)
            }
            const message: string = 'Contract is invalid or missing, see action data:' // 'Contract is not valid - ' + e
            return { template: message + '<br /><div class="' + styles.invalidContract + '">' + invalidContractData + '</div>' }
            // Unhandled Rejection (RicardianContractError): Missing Required Field: title
        }
    }
    return contract
}

export const Actions = (props: IActionsProps) => {
    const { endpoint, transaction } = props
    return (
        <ReactCSSTransitionGroup
            transitionAppear={true}
            transitionName={animations}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
        >
            <table>
                <thead>
                    <tr>
                        <td>Account</td>
                        <td>Action</td>
                    </tr>
                </thead>
                { transactionHasActions(transaction) && (
                    transaction.trx.transaction.actions.map( (action: any, actionIndex: number) => {
                        return (
                            <ExpandableTableBody key={actionIndex} isExpanded={actionIndex === 0}>
                                <tr>
                                    <td>{action.account}</td>
                                    <td>{action.name}</td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>
                                        <RicardianContractExplorer endpoint={endpoint}
                                            contractCallback={getContractFromAction}
                                            transaction={transaction} actionIndex={actionIndex} />
                                    </td>
                                </tr>
                            </ExpandableTableBody>
                        )
                    })
                )}
            </table>
        </ReactCSSTransitionGroup>
    )
}

export default Actions
