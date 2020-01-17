import React from 'react'
import styles from '../App.module.scss'
import BlockExplorer from '../components/BlockExplorer'
import Header from './Header'

import { debounce, debounceAndRetry, DebounceAndRetry } from '../utils/debounceAndRetry'

// let counter = 0
// const logDebounce = new DebounceAndRetry(() => {
//     console.log('this is a test')
// }, 1000, () => {
//     counter++
//     if (counter >= 3) {
//         return true
//     }
//     return false
// })

// const testDebounce = () => {
//     counter = 0
//     logDebounce.debounce()
// }

let times: number = 0
const retryCond = () => {
    console.log('times', times + 1)
    times++
    return times >= 5
}

export const Layout = () => {
    return (
        <>
            <header onClick={() => {
                times = 0
                debounceAndRetry(() => { console.log('hello world') }, 500, retryCond)
            }} className={styles.AppHeader}>
                <Header />
            </header>
            <main>
                <BlockExplorer endpoint='https://api.eosnewyork.io' />
            </main>
        </>
    )
}

export default Layout
