/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage";
const loginPage = new LoginPage();

context("Login", () => {
  it.only("Validar Fazer login com dados valido", () => {
    cy.allure().feature("Login").story("Dados válidos");
    loginPage.preencherCampoEmail("lucas");
    loginPage.preencherCampoPassword("123");
    loginPage.clicarBtnFazerLogin();
  });

  it("Validar Mensagem Error ao Fazer login com Email Invalido", () => {
    cy.allure().feature("Login").story("Dados inválidos");
  });

  it("Validar Fazer login com senha incorreta", () => {
    cy.allure().feature("Login").story("Dados inválidos");
  });

  it("Validar clicar no botao inscrever-se redireciona a página", () => {
    cy.allure().feature("Login").story("Dados válidos");
    loginPage.clicarBtnRegistrar();
  });

});
