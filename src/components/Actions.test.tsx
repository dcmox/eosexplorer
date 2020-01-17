import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Actions } from './Actions'
import testTransaction from './test-data/transaction.json'
import testValues from './test-data/values.json'

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Actions endpoint={testValues.endpoint} transaction={testTransaction} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
