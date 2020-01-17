import React from 'react'
import ReactDOM from 'react-dom'
import BlockExplorer from './BlockExplorer'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import testValues from './test-data/values.json'

configure({ adapter: new Adapter() });

let elements = {
  loadingMessage: '.loadingMessage',
  loadButton: '.loadMore'
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BlockExplorer endpoint={testValues.endpoint} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe("BlockExplorer Component Tests", () => {

  test("it set the fetchAmount and endpoint on the component props", () => {
    const component = mount(<BlockExplorer endpoint={testValues.endpoint} fetchAmount={testValues.fetchAmount} />)
    expect(component.props().endpoint).toEqual(testValues.endpoint)
    expect(component.props().fetchAmount).toEqual(testValues.fetchAmount)
  })

  test("it shows a message when no endpoint is specified and doesn't display a button", () => {
    const component = shallow(<BlockExplorer endpoint={testValues.noEndpoint} />)
    const loadingMessage = component.find(elements.loadingMessage)
    expect(loadingMessage.text()).toBe(testValues.loadingMessageNoEndpoint)

    const button = component.find(elements.loadButton)
    expect(button.length).toEqual(0)
  })

  test("it shows 'Loading...' for the button text when loading", () => {
    const component = shallow(<BlockExplorer endpoint={testValues.endpoint} />)
    const button = component.find(elements.loadButton)
    expect(button.text()).toBe(testValues.buttonLoading)
  })

  test("it shows the loading div when loading", () => {
    const component = mount(<BlockExplorer endpoint={testValues.endpoint} />)
    const loadingMessage = component.find(elements.loadingMessage)
    expect(loadingMessage.text()).toBe(testValues.loadingMessageWithEndpoint)
  })
})