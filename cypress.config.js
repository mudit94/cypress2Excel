const { defineConfig } = require("cypress");

module.exports = defineConfig({
  includeShadowDom: true,
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  reporterOptions:{
    json: true,
    html:false,
    overwrite:false,
    reportDir:'cypress/reports'
  },
  video:false,
  e2e: {
    setupNodeEvents(on, config) {
      // require('cypress-mochawesome-reporter/plugin')(on);

      // implement node event listeners here
    },
  },
});
