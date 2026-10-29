const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'bz2ipd',
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true,
      requestMode: true,
    },
    experimentalRunAllSpecs: true,
  },
  fixturesFolder: false,
  video: false,
})
