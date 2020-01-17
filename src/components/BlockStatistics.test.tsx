import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {BlockStatistics, numberWithCommas, hasBlockInfo} from './BlockStatistics'
import testBlock from './test-data/block.json'

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div')
  let blockState = {blocks: [testBlock], loading:false}
  ReactDOM.render(<BlockStatistics blockState={blockState} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe("Transaction Component Tests", () => {
  test('it should see if the blockState contains blocks', () => {
    let blockState = {blocks: [testBlock], loading:false}
    let hasBlockInfoResult:boolean = hasBlockInfo(blockState)
    expect(hasBlockInfoResult).toBe(true)

    blockState = {blocks: [], loading:false}
    hasBlockInfoResult = hasBlockInfo(blockState)
    expect(hasBlockInfoResult).toBe(false)
  })

  test("it should format a number with commas", () => {
    let sampleNumber:string = numberWithCommas(1000)
    expect(sampleNumber).toBe('1,000')

    sampleNumber = numberWithCommas(1000000)
    expect(sampleNumber).toBe('1,000,000')

    sampleNumber = numberWithCommas(0)
    expect(sampleNumber).toBe('0')
  })
 
})