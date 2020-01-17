import React, { useEffect, useState, useCallback } from 'react'
import { Blocks, getBlocks } from './Blocks'
import BlockStatistics from './BlockStatistics'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './BlockExplorer.module.scss'
import animations from '../animations.module.scss'

interface IBlockExplorerProps {
    endpoint: string,
    fetchAmount?: number,
}

export const BlockExplorer = (props: IBlockExplorerProps) => {
    let { endpoint, fetchAmount } = props 
    const state = useState({blocks: [], loading: true})
    let [ blockState, setBlockState ] = state
    
    const getBlocksCallback = useCallback(async () => {
        setBlockState({blocks: [], loading: true})
        let blocks = await getBlocks(endpoint, fetchAmount)
        setBlockState({blocks: blocks, loading: false})
    }, [setBlockState, endpoint, fetchAmount])

    useEffect( () => {   
        getBlocksCallback()
    }, [getBlocksCallback])

    return (
        <div className={styles.blockExplorer} id='blockExplorer'>
            {endpoint ? (
                blockState.loading ? (
                    <ReactCSSTransitionGroup 
                        transitionAppear={true} 
                        transitionName={animations} 
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        <div>
                             <span className='loadingMessage'>Fetching blocks from EOS blockchain...</span>
                        </div>
                        <button className='loadMore'>Loading...</button>
                    </ReactCSSTransitionGroup>
                ) : (
                    <>
                        <BlockStatistics blockState={blockState} /><br />
                        <Blocks state={state} endpoint={endpoint} />
                        <button className='loadMore' onClick={() => getBlocksCallback()}>Load</button> 
                    </>
                )
            ) : ( 
                <div>
                    <span className='loadingMessage'>No endpoint specified!</span>
                </div>
            )}
        </div>
    )
}

export default BlockExplorer