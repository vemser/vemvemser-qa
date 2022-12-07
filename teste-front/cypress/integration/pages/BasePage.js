/// <reference types="cypress" />

export default class BasePage {
  click(elemet) {
    cy.get(elemet).click();
  }

  clickForce(elemet) {
    cy.get(elemet).click({ force: true });
  }

  fillInput(element, text) {
    cy.get(element).type(text);
  }

  fillInputComTeclaNoFinal(element, text, tecla) {
    cy.get(element).type(text).type(tecla);
  }

  fillInputForce(element, text) {
    cy.get(element).type(text, { force: true });
  }

  clearInput(element) {
    cy.get(element).clear();
  }

  hoverElement(element, popover) {
    cy.get(element).trigger("mouseover");
    cy.get(popover).should("be.visible");
  }

  time(time) {
    cy.wait(time);
  }

  select(element, value) {
    cy.get(element).select(value);
  }

  validateText(element, text) {
    cy.get(element).should("contain", text);
  }

  invalidateText(element, text) {
    cy.get(element).should("not.contain", text);
  }

  validateQuantItemNaLista(element, quant) {
    cy.get(element).should("have.length", quant);
  }

  validateRedirecionarPagina(urlExpected) {
    cy.url().should("contain", urlExpected);
  }

  validateNaoRedirecionarPagina(urlExpected) {
    cy.url().should("not.contain", urlExpected);
  }

  validateNotExist(element) {
    cy.get(element).should("not.exist");
  }

  validateIsDisabled(element) {
    cy.get(element).should("be.disabled");
  }

  haveAttributeDisabled(element) {
    cy.get(element).should("have.attr", "disabled");
  }
}
