exports.config = {
    runner: 'local',
    path: '/wd/hub',
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
    }],
    logLevel: 'error', // warn
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'], //'chromedriver'],
    seleniumInstallArgs: {
        drivers: {
            chrome: { version: '77.0.3865.40' },
            firefox: { version: '0.25.0' },
        }
    },
    seleniumArgs: {
        drivers: {
            chrome: { version: '77.0.3865.40' },
            firefox: { version: '0.25.0' },
        }
    },
    framework: 'mocha',
    reporters: ['allure'],
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
