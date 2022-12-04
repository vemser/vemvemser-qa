/// <reference types="cypress" />

import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import { baseUrl } from "../../support/commands";
import CandidatePage from "../pages/CandidatePage";

const adminLogin = require("../../fixtures/adminLogin.json");
const colabLogin = require("../../fixtures/colaborador.json");
const newUser = require("../../fixtures/newUser.json");
const newUser2 = require("../../fixtures/newUser2.json");
const newUser3 = require("../../fixtures/newUser3.json");
const newUserEdit = require("../../fixtures/newUserEdit.json");
const newUserEditNaoDbc = require("../../fixtures/newUserEditNaoDbc.json");
const candidate1 = require("../../fixtures/candidate1.json");
const basePage = new BasePage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const candidatePage = new CandidatePage();

context("Dashboard", () => {
  beforeEach(() => {
    loginPage.login(adminLogin);
  });
  it("validar buscar gestor pelo nome com sucesso", () => {
    cy.allure().feature("Filtro").story("Dados válidos");
    dashboardPage.createNovoAdministrador(newUser);
    dashboardPage.fillFieldNome(newUser.name);
    dashboardPage.clickBtnBuscar();
    dashboardPage.validateBuscarGestorNome(newUser.name);
    dashboardPage.listGestor(newUser);
    dashboardPage.deleteNovoUser();
  });

  it("validar buscar gestor pelo email com sucesso", () => {
    cy.allure().feature("Filtro").story("Dados válidos");
    dashboardPage.createNovoAdministrador(newUser);
    dashboardPage.fillFieldEmail(newUser.email);
    dashboardPage.clickBtnBuscar();
    dashboardPage.validateBuscarGestorEmail(newUser.email);
    dashboardPage.listGestor(newUser);
    dashboardPage.deleteNovoUser();
  });

  it("validar cadastrar administrador com sucesso", () => {
    cy.allure().feature("Cadastro").story("Dados válidos");
    dashboardPage.createNovoAdministrador(newUser);
    dashboardPage.validateCadastroComSucesso();
    dashboardPage.listGestor(newUser);
    dashboardPage.deleteNovoUser(newUser);
  });

  it("validar cadastrar colaborador com sucesso", () => {
    cy.allure().feature("Cadastro").story("Dados válidos");
    dashboardPage.createNovoColaborador(newUser);
    dashboardPage.validateCadastroComSucesso();
    dashboardPage.listColaborador(newUser);
    dashboardPage.deleteNovoUser(newUser);
  });

  it("validar cadastrar colaborador não preenchendo campos retorna mensagem de erro ", () => {
    cy.allure().feature("Cadastro").story("Dados válidos");
    dashboardPage.createNovoColaboradorInvalido();
    dashboardPage.validateCadastroInvalido();
  });
  it("validar atualizar dados do gestor com sucesso", () => {
    cy.allure().feature("Atualizar dados").story("Dados válidos");
    dashboardPage.createNovoAdministrador(newUser3);
    basePage.time(2000);
    dashboardPage.listGestor(newUser3);
    dashboardPage.editGestor(newUserEdit);
    basePage.time(2000);
    dashboardPage.listGestor(newUserEdit);
    dashboardPage.deleteNovoUser(newUserEdit);
  });

  it("validar excluir gestor com sucesso", () => {
    cy.allure().feature("Excluir gestor").story("Dados válidos");
    dashboardPage.createNovoAdministrador(newUser2);
    basePage.time(2000);
    dashboardPage.listGestor(newUser2);
    dashboardPage.deleteNovoUser(newUser2);
    dashboardPage.validateDeletarUserSucesso();
  });

  it("validar editar gestor com email não @dbccompany.com.br retorna mensagem de erro 'Só é válido o email com @dbccompany.com.br'", () => {
    cy.allure().feature("Atualizar dados").story("Dados inválidos");
    dashboardPage.createNovoAdministrador(newUser3);
    dashboardPage.listGestor(newUser3);
    dashboardPage.validatePerfilEditErrorEmailNaoDBC(newUserEditNaoDbc);
    basePage.time(2000);
  });

  it("validar editar próprio perfil com email não @dbccompany.com.br retorna mensagem de erro 'Só é válido o email com @dbccompany.com.br'", () => {
    cy.allure().feature("Atualizar dados").story("Dados inválidos");
    dashboardPage.validatePerfilErrorEmailNaoDBC(newUserEditNaoDbc);
  });

  it("validar não redirecionar para tela de edição de gestor quando logado com colaborador", () => {
    cy.allure().feature("Listar dados").story("Dados inválidos");
    dashboardPage.clickBtnSair();
    loginPage.fillFieldEmail(colabLogin.email);
    loginPage.fillFieldPassword(colabLogin.password);
    loginPage.clickBtnFazerLogin();
    dashboardPage.listGestor(adminLogin);
    basePage.validateNaoRedirecionarPagina(`${baseUrl}/dashboard/edit-user`);
    dashboardPage.validateIsNotVisibleExcluir();
  });
});
