/// <reference types="cypress" />
import CandidatePage from "../pages/CandidatePage";
import LoginPage from "../pages/LoginPage";
import { faker } from "@faker-js/faker";
import BasePage from "../pages/BasePage";

const candidate1 = require("../../fixtures/candidate1.json");
const candidatePage = new CandidatePage();
const loginPage = new LoginPage();
const basePage = new BasePage();

context("Inscrição", () => {
  beforeEach(() => {
    loginPage.clickBtnRegistrar();
  });
  it("Validar inscrição de candidato com sucesso", () => {
    let email = "candidato@gmail.com";
    cy.allure().feature("Inscrição").story("Dados válidos");
    candidatePage.fillCadastroCandidato(candidate1, email);
    candidatePage.fillFormulario(candidate1);
    candidatePage.validateInscricaoCompleta();
    basePage.time(2000);
  });

  it("Validar inscrição de candidato com dados válidos e marcando 'Não' para 'Você é matriculado em algum curso de graduação ou técnico?' retorna mensagem de erro", () => {
    cy.allure().feature("Inscrição").story("Dados válidos");
    candidatePage.fillCadastroCandidato(
      candidate1,
      faker.internet.exampleEmail()
    );
    candidatePage.clickRadioNao();
    candidatePage.validateInstituicaoSuperiorError();
  });

  it("Validar preencher campo nome com dado inválido retorna mensagem de erro 'Nome inválido'", () => {
    cy.allure().feature("Inscrição").story("Dados inválidos");
    candidatePage.fillFieldNome("12314546");
    candidatePage.fillFieldCPF(candidate1.CPF);
    candidatePage.clickBtnProximoStep1();
    candidatePage.validateNomeError();
  });

  it("Validar preencher campo email com dado inválido retorna mensagem de erro 'Email inválido'", () => {
    cy.allure().feature("Inscrição").story("Dados inválidos");
    candidatePage.fillFieldEmail("abc");
    candidatePage.fillFieldCPF(candidate1.CPF);
    candidatePage.clickBtnProximoStep1();
    candidatePage.validateEmailError();
  });

  it("Validar botão 'próximo' permanece desativado ao preencher campo CPF com dado inválido", () => {
    cy.allure().feature("Inscrição").story("Dados inválidos");
    candidatePage.fillFieldCPF("1224124");

    candidatePage.validateBtnProximoStep1Desabilitado();
  });

  it("Validar preencher campo Telefone com dado inválido retorna mensagem de erro 'O telefone precisa ser válido.'", () => {
    cy.allure().feature("Inscrição").story("Dados inválidos");
    candidatePage.fillFieldTelefone("122");
    candidatePage.fillFieldCPF(candidate1.CPF);
    candidatePage.clickBtnProximoStep1();
    candidatePage.validateTelefoneError();
  });

  it("Validar preencher campo RG com dado inválido retorna mensagem de erro 'O RG precisa ter no mínimo 7 caracteres'", () => {
    cy.allure().feature("Inscrição").story("Dados inválidos");
    candidatePage.fillFieldRG("12314");
    candidatePage.fillFieldCPF(candidate1.CPF);
    candidatePage.clickBtnProximoStep1();
    candidatePage.validateRgError();
  });

  it("Validar preencher campo Cidade com dado inválido retorna mensagem de erro 'É necessário no mínimo 3 letras'", () => {
    cy.allure().feature("Inscrição").story("Dados inválidos");
    candidatePage.fillFieldCidade("ta");
    candidatePage.fillFieldCPF(candidate1.CPF);
    candidatePage.clickBtnProximoStep1();
    candidatePage.validateCidadeError();
  });

  it("Validar não preencher campos do Step 1 com dados válidos retorna mensagens de erro", () => {
    cy.allure().feature("Inscrição").story("Dados inválidos");
    candidatePage.fillFieldCPF(candidate1.CPF);
    candidatePage.clickBtnProximoStep1();
    candidatePage.validateCamposVaziosStep1();
  });

  it("Validar botão 'próximo' desabilitado ao não preencher todos os campos obrigatórios do Step 2 com dados válidos", () => {
    cy.allure().feature("Inscrição").story("Dados inválidos");
    candidatePage.fillCadastroCandidato(
      candidate1,
      faker.internet.exampleEmail()
    );
    candidatePage.clickRadioSim();
    candidatePage.fillFieldInstituicao(candidate1.institution);
    candidatePage.fillFieldCurso(candidate1.course);
    candidatePage.validateBtnProximoStep2Desabilitado();
  });
});
