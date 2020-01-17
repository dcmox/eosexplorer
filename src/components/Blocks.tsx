import React from 'react'
import moment from 'moment'
import { JsonRpc } from 'eosjs'
import { fetch } from 'node-fetch'
import ExpandableTableBody from './ExpandableTableBody'
import Transactions, { getNumberOfActions } from './Transactions'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import animations from '../animations.module.scss'
import styles from './Blocks.module.scss'

interface IBlocksProps{
    state: any,
    endpoint: string
}

export const getBlocks = async (endpoint: string, fetchAmount?: number) => {
    if (fetchAmount === undefined) {
        fetchAmount = 10
    }
    let blocks:any = []
    if (endpoint) {
        const rpc = new JsonRpc(endpoint, { fetch })
        const resp = await rpc.get_info() // get latest block info
        let blockNum:number = resp.head_block_num
        for (let i = 0; i < (fetchAmount || 10); i++) {
            blocks.push(await rpc.get_block(blockNum))
            blockNum--
        }
    }
    return blocks
} 

export const Blocks = (props: IBlocksProps) => {
    let { state, endpoint } = props
    const [blockState,] = state
    if (!blockState.blocks.length) {
        return null
    }
    return (
        <ReactCSSTransitionGroup 
            transitionAppear={true} 
            transitionName={animations} 
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
        >
            <table className={styles.blocks}>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Block Hash</th>
                        <th>Txs</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {blockState.blocks.map( (block:any, index:number) => {
                    return (
                        <ExpandableTableBody key={index}>
                            <tr>
                                <td>{moment(block.timestamp).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{block.id}</td>
                                <td>{block.transactions.length}</td>
                                <td>{getNumberOfActions(block.transactions)}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <Transactions endpoint={endpoint} block={block} />
                                    <pre>
                                        {JSON.stringify(block, null, 2)}
                                    </pre>
                                </td>
                            </tr>
                        </ExpandableTableBody>
                    )
                })}
            </table>
        </ReactCSSTransitionGroup>
    )
}

export default Blocks