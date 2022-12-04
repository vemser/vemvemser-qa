/// <reference types="cypress" />

import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";

const adminLogin = require("../../fixtures/adminLogin.json");
const colaboradorLogin = require("../../fixtures/colaborador.json");
const loginPage = new LoginPage();
const basePage = new BasePage();

context("Login", () => {
  it("Validar fazer login do usuario admin com sucesso", () => {
    cy.allure().feature("Login").story("Dados válidos");
    loginPage.fillFieldEmail(adminLogin.email);
    loginPage.fillFieldPassword(adminLogin.password);
    loginPage.clickBtnFazerLogin();
    loginPage.validateRedirecionarParaDashboard();
  });

  it("Validar fazer login do usuario colaborador com sucesso", () => {
    cy.allure().feature("Login").story("Dados válidos");
    loginPage.fillFieldEmail(colaboradorLogin.email);
    loginPage.fillFieldPassword(colaboradorLogin.password);
    loginPage.clickBtnFazerLogin();
    loginPage.validateRedirecionarParaDashboard();
  });

  it("Validar Fazer login com dados inválidos retorna mensagem de erro 'Email ou senha inválidos'", () => {
    cy.allure().feature("Login").story("Dados inválidos");
    loginPage.fillFieldEmail("lucas");
    loginPage.fillFieldPassword("123");
    loginPage.clickBtnFazerLogin();
    loginPage.validateCampoEmailError();
  });

  it("Validar fazer login com Email Invalido retorna mensagem de erro 'Email ou senha inválidos' ", () => {
    cy.allure().feature("Login").story("Dados inválidos");
    loginPage.fillFieldEmail("lucas@gmail.com");
    loginPage.fillFieldPassword("123");
    loginPage.clickBtnFazerLogin();
    loginPage.validateLoginError();
  });

  it("Validar Fazer login com senha incorreta retorna mensagem de erro 'Email ou senha inválidos'", () => {
    cy.allure().feature("Login").story("Dados inválidos");
    loginPage.fillFieldEmail(adminLogin.email);
    loginPage.fillFieldPassword("q213");
    loginPage.clickBtnFazerLogin();
    loginPage.validateLoginError();
  });

  it("Validar Fazer login sem preencher campos retorna mensagem de erro", () => {
    cy.allure().feature("Login").story("Dados inválidos");
    loginPage.clickBtnFazerLogin();
    loginPage.validateLoginCamposVaziosError();
  });

  it("Validar clicar no botao inscrever-se redireciona para página de inscrição", () => {
    cy.allure().feature("Login").story("Dados válidos");
    loginPage.clickBtnRegistrar();
    loginPage.validateRedirecionarParaInscricao();
  });
});
