const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    specPattern: "cypress/e2e/**/*.{js, feature}",
    baseUrl: "https://practice.expandtesting.com/notes",
    reporter: "mochawesome",
    chromeWebSecurity: false,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporter-config.json",
    }
  },
});
