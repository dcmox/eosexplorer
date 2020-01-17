import React from 'react'
import ReactDOM from 'react-dom'
import RicardianContractExplorer from './RicardianContract'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import testValues from './test-data/values.json'

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div')
    let transaction = {
        trx: {
            transaction: {
                actions: [
                    {
                        account: 'eosio.token',
                        name: 'transfer'
                    }
                ]
            }
        }
    }

    let callback = async () => {
        const resolvingPromise = new Promise( (resolve) => {
            resolve({template:''})
        })
        return await resolvingPromise
    }

    ReactDOM.render(<RicardianContractExplorer endpoint={testValues.endpoint} contractCallback={callback} transaction={transaction} actionIndex={0} />, div)
    setTimeout( () => ReactDOM.unmountComponentAtNode(div), 10)
})