import React, { useEffect, useState } from 'react'
import { ContractMetadata } from 'ricardian-template-toolkit'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import animations from '../animations.module.scss'
import styles from './RicardianContract.module.scss'

interface IRicardianContractProps{
    endpoint: string, 
    contractCallback: Function,
    transaction: any,
    actionIndex: number
}

export interface IRicardianContract {
    template: string,
    metaData?: ContractMetadata
}

export const RicardianContractExplorer = (props:IRicardianContractProps) => {

    let { endpoint, contractCallback, transaction, actionIndex } = props

    let state = useState({template: ''})
    let [contractState, setContractState] = state

    useEffect( () => {
        let isSubscribed = true
        contractCallback(endpoint, transaction, actionIndex).then((contract:IRicardianContract) => {
            if (isSubscribed) {
                setContractState(contract)
            }
        })
        return () => { isSubscribed = false }
    }, [contractCallback, endpoint, transaction, actionIndex, setContractState])
    
    return (
        <div className={styles.ricardianContract} >
            {contractState.template && (
                 <ReactCSSTransitionGroup 
                    transitionAppear={true} 
                    transitionName={animations} 
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <div dangerouslySetInnerHTML={{__html: contractState.template}}></div>
                </ReactCSSTransitionGroup>
            )}
        </div>
    )
}

export default RicardianContractExplorer