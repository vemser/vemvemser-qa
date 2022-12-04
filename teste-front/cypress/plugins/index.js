/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const allureWriter = require("@shelex/cypress-allure-plugin/writer");
module.exports = (on, config) => {
  allureWriter(on, config);
  return config;
};
