/// <reference types="cypress" />

export default class BasePage {
  click(elemet) {
    cy.get(elemet).click();
  }

  clickForce(elemet) {
    cy.get(elemet).click({ force: true });
  }

  preencherInput(element, text) {
    cy.get(element).type(text);
  }

  preencherInputComTeclaNoFinal(element, text, tecla) {
    cy.get(element).type(text).type(tecla);
  }

  preencherInputForce(element, text) {
    cy.get(element).type(text, { force: true });
  }

  limparInput(element) {
    cy.get(element).clear();
  }

  hoverElement(element, popover) {
    cy.get(element).trigger('mouseover')
    cy.get(popover).should('be.visible') 
  }

  tempo(tempo) {
    cy.wait(tempo);
  }

  select(element, value) {
    cy.get(element).select(value);
  }

  validarText(element, text) {
    cy.get(element).should("contain", text);
  }

  invalidarText(element, text) {
    cy.get(element).should("not.contain", text);
  }

  validarQuantItemNaLista(element, quant) {
    cy.get(element).should("have.length", quant);
  }

  validarRedirecionarPagina(urlExpected) {
    cy.url().should("contain", urlExpected);
  }
}
