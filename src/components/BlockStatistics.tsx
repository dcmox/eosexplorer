import React from 'react'
import styles from './BlockStatistics.module.scss'

export interface BlockState {
    blocks: any[],
    loading: boolean
}

interface IBlockStatisticsProps {
    blockState: BlockState
}

export const numberWithCommas = (number: number) : string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const hasBlockInfo = (blockState: BlockState) : boolean => {
    return blockState.blocks.length > 0
} 

export const BlockStatistics = (props:IBlockStatisticsProps) => {
    let { blockState } = props
    return (
        <table className={styles.blockStatistics}>
            <thead>
                <tr>
                    <th>
                        Head Block
                    </th>
                    <th>
                        Last Block Producer
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        { hasBlockInfo(blockState) && ( 
                            numberWithCommas(blockState.blocks[0].block_num)
                        )}
                    </td>
                    <td>
                        { hasBlockInfo(blockState) && ( 
                            blockState.blocks[0].producer
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default BlockStatistics