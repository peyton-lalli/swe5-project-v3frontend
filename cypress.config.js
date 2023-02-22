//from https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Step-3-Configure-Cypress
const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
const env = dotenv.config("./.env").parsed;

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8081",
    env: {
      ...env,
    },
  },
});
