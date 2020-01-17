import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import * as serviceWorker from './serviceWorker'

import * as tests from './utils/csvToJson'
import * as testData from './utils/test-data/csv'

// import { DebounceAndRetry } from './utils/debounceAndRetry'

// console.log('hmmm')

// const debounce = new DebounceAndRetry(() => {
//     console.log('this is a test')
// })

// debounce.start()

console.log(tests.csvToJson(testData.csvData))

// If we had custom routes we could add them here and build in better state management
ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
