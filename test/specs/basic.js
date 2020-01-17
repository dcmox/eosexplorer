const assert = require('assert')
const Page = require('../lib/page')

let elem = new Page({
    'blockExplorer': '#blockExplorer',
    'blocksTable': '#blockExplorer span table',
    'loadingButton': 'button',
    'loadingMessage': '.loadingMessage'
})

let testValues = {
    'loadingButtonText': 'LOADING...',
    'loadingMessageText': 'Fetching blocks from EOS blockchain...'
}

afterEach ( () => {
    browser.pause(100)
})

describe('EOS Block Explorer', () => {
    it('should navigate to the homepage', () => {
        browser.url('http://localhost:3000')
        assert.equal(browser.getTitle(), "EOS Block Explorer")
    })

    it('should see a loading button and a loading message', () => {
        elem.loadingMessage.waitForDisplayed()
        assert.equal(elem.loadingButton.getText(), testValues.loadingButtonText)
        assert.equal(elem.loadingMessage.getText(), testValues.loadingMessageText)
        elem.blocksTable.waitForDisplayed()
    })

    it('should should see the table and 10 blocks', () => {
        elem.blocksTable.$('tbody').waitForDisplayed()
        assert.equal(elem.blocksTable.$$('tbody').length, 10)
    })

    it('should be able to expand a block header to see details', () => {
        assert.equal(elem.blocksTable.$$('tbody')[0].$$('tr').length, 1)
        elem.blocksTable.$$('tbody')[0].$('tr').click()
        assert.equal(elem.blocksTable.$$('tbody table').length, 1)
    })

    it('should be able to close a blocks detail by clicking the row', () => {
        elem.blocksTable.$$('tr')[1].click()
        assert.equal(elem.blocksTable.$$('tr').length, 11)
    })

    it('should say loading when you click the load button', () => {
        elem.blockExplorer.$('button').click()
        elem.loadingMessage.waitForDisplayed()
        assert.equal(elem.blockExplorer.$('button').getText(), testValues.loadingButtonText)
    })
})
