import React from 'react'
import ReactDOM from 'react-dom'
import ExpandableTableBody from './ExpandableTableBody'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const table = document.createElement('table')
    ReactDOM.render(
        <ExpandableTableBody>
            <tr>
                <td>Clickable Row</td>
            </tr>
            <tr>
                <td>This is a test</td>
            </tr>
        </ExpandableTableBody>
    , table)
    ReactDOM.unmountComponentAtNode(table)
})

describe("ExpandableTableBody Component Tests", () => {
    test("it expands and collapses the secondary row", () => {
        const component = mount(
            <table>
                <ExpandableTableBody>
                    <tr>
                        <td>Clickable Row</td>
                    </tr>
                    <tr>
                        <td>This is a test</td>
                    </tr>
                </ExpandableTableBody>
            </table>
        )
        expect(component.find('tbody tr').length).toBe(1)
        component.find('tbody tr').first().simulate('click')
        expect(component.find('tbody tr').length).toBe(2)
        component.find('tbody tr').first().simulate('click')
        expect(component.find('tbody tr').length).toBe(1)
    })

    test("it does not expand if isExpandable prop is set to false", () => {
        const component = mount(
            <table>
                <ExpandableTableBody isExpandable={false}>
                    <tr>
                        <td>Clickable Row</td>
                    </tr>
                    <tr>
                        <td>This is a test</td>
                    </tr>
                </ExpandableTableBody>
            </table>
        )
        expect(component.find('tbody tr').length).toBe(1)
        component.find('tbody tr').first().simulate('click')
        expect(component.find('tbody tr').length).toBe(1)
        component.find('tbody tr').first().simulate('click')
        expect(component.find('tbody tr').length).toBe(1)
    })

    test("it is expanded when prop is set", () => {
        const component = mount(
            <table>
                <ExpandableTableBody isExpanded={true}>
                    <tr>
                        <td>Clickable Row</td>
                    </tr>
                    <tr>
                        <td>This is a test</td>
                    </tr>
                </ExpandableTableBody>
            </table>
        )
        expect(component.find('tbody tr').length).toBe(2)
        component.find('tbody tr').first().simulate('click')
        expect(component.find('tbody tr').length).toBe(1)
    })
})