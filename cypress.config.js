
module.exports = {
  e2e: {
    defaultCommandTimeout: 30000,
	  pageLoadTimeout: 80000,
    // testIsolation: false,
    chromeWebSecurity: false,
    requestTimeout: 10000,

    setupNodeEvents(on, config) {
      // implement node event listeners here

    },

    env: {
      moisesHomePage: 'https://studio.moises.ai'
    },
  },
};
