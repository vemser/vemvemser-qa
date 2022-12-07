import "cypress-localstorage-commands";
export const baseUrl = Cypress.env("baseUrl");
beforeEach(() => {
  cy.visit(baseUrl);
});
