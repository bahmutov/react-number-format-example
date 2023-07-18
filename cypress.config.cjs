const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:5173/',
    supportFile: false,
    fixturesFolder: false,
    viewportWidth: 300,
    viewportHeight: 200,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
  },

  component: {
    viewportWidth: 300,
    viewportHeight: 200,
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
