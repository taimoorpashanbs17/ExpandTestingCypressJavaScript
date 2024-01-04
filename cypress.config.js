const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // require("cypress-localstorage-commands/plugin")(on, config)
      // return config
      return require("./cypress/plugins/index.js", "cypress-localstorage-commands/plugin")(on, config);
      
    },
    specPattern: "cypress/e2e/**/*.{js, feature}",
    baseUrl: "https://practice.expandtesting.com/notes",
    reporter: "mochawesome",
    chromeWebSecurity: false,
    testIsolation: false,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporter-config.json",
    }
  },
});
