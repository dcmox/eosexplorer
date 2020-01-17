import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Transactions, getNumberOfActions, transactionHasActions} from './Transactions'
import testBlock from './test-data/block.json'
import testValues from './test-data/values.json'

let transactionValues = {
    testTransactionA: [
        {
            trx:
            {
                transaction: {
                    actions:[1, 2]
                }
            }
        },
        {
            trx:
            {
                transaction: {
                    actions:[3, 4]
                }
            }
        },
    ],
    testTransactionB: [
        {
            trx: {
                transaction: {
                    actions:[1, 2]
                }
            }
        },
        {
            trx: {
                transaction: {
                    actions:[3]
                }
            }
        },
    ],
    testTransactionC: [
        {
            trx: {
                transaction:{}
            }
        },
        {
            trx: {
            }
        },
        {
            trx: {
                transaction: {actions:[1]}
            }
        },
    ],
    testTransactionAExpected: 4,
    testTransactionBExpected: 3,
    testTransactionCExpected: 1,
}

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Transactions endpoint={testValues.endpoint} block={testBlock} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe("Transaction Component Tests", () => {
  test('it should detect if a transaction has actions', () => {
    let hasActions:boolean = transactionHasActions(transactionValues.testTransactionC[0])
    expect(hasActions).toBe(false)

    hasActions = transactionHasActions(transactionValues.testTransactionC[1])
    expect(hasActions).toBe(false)

    hasActions = transactionHasActions(transactionValues.testTransactionC[2])
    expect(hasActions).toBe(true)
  })

  test("it should get the number of actions for a block", () => {
    let actions:number = getNumberOfActions(transactionValues.testTransactionA)
    expect(actions).toBe(transactionValues.testTransactionAExpected)

    actions = getNumberOfActions(transactionValues.testTransactionB)
    expect(actions).toBe(transactionValues.testTransactionBExpected)

    // test to ensure different data formats don't break our function
    actions = getNumberOfActions(transactionValues.testTransactionC)
    expect(actions).toBe(transactionValues.testTransactionCExpected)
  })
 
})