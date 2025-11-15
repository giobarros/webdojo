const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },  

    //video: true - grava cada execução, um otimo recurso para diversas situações, ex: reprodução de bugs
    baseUrl: 'http://localhost:3000',
    viewportHeight: 900,
    viewportWidth: 1440
  },
});
