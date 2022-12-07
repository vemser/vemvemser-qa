/// <reference types="cypress" />

import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import { baseUrl } from "../../support/commands";
import CandidatePage from "../pages/CandidatePage";

const adminLogin = require("../../fixtures/adminLogin.json");
const candidate1 = require("../../fixtures/candidate1.json");
const basePage = new BasePage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const candidatePage = new CandidatePage();

context("Fluxo de inscrição", () => {
  it.only("validar fazer inscrição, avaliar inscrição e deletar ", () => {
    let email = "alaindelonm@gmail.com";
    cy.allure().feature("Inscrição").story("Dados válidos");
    cy.visit(baseUrl);
    loginPage.clickBtnRegistrar();
    candidatePage.fillCadastroCandidato(candidate1, email);
    candidatePage.fillFormulario(candidate1);
    basePage.time(2000);

    cy.visit(`${baseUrl}`);
    loginPage.login(adminLogin);
    dashboardPage.listInscricao(email);
    dashboardPage.evaluateInscricoes();
    dashboardPage.clickResultadoBuscaInscricoes();
    dashboardPage.clickBtnVoltar();
    dashboardPage.deletarInscricao(email);
    basePage.time(2000);
    dashboardPage.validateDeleteInscricao();
  });
});
