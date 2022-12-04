import { baseUrl } from "../../support/commands";
import BasePage from "./BasePage";

const basePage = new BasePage();

const email = "#home-email";
const password = "#home-senha";
const btnLogin = "#home-entrar";
const btnRegister = "#register";
const loginErrorText = ".Toastify__toast-body > :nth-child(2)";
const dashboardURL = `${baseUrl}/dashboard`;
const inscricaoTitle = ".MuiBox-root > .MuiTypography-root";
const emailErrorTxt = "#home-email-helper-text";
const senhaErrorTxt = "#home-senha-helper-text";
export default class LoginPage {
  fillFieldEmail(text) {
    basePage.fillInput(email, text);
  }

  fillFieldPassword(text) {
    basePage.fillInput(password, text);
  }

  clickBtnFazerLogin() {
    basePage.click(btnLogin);
  }

  clickBtnRegistrar() {
    basePage.click(btnRegister);
  }

  validateLoginError() {
    basePage.validateText(loginErrorText, "Email ou senha inválidos");
  }

  validateCampoEmailError() {
    basePage.validateText(emailErrorTxt, "Digite seu email");
  }

  validateLoginCamposVaziosError() {
    basePage.validateText(emailErrorTxt, "Digite seu email");
    basePage.validateText(senhaErrorTxt, "Digite sua senha");
  }

  validateRedirecionarParaDashboard() {
    basePage.validateRedirecionarPagina(dashboardURL);
  }

  validateRedirecionarParaInscricao() {
    basePage.validateText(inscricaoTitle, "Informações Cadastrais");
  }

  login(user) {
    this.fillFieldEmail(user.email);
    this.fillFieldPassword(user.password);
    this.clickBtnFazerLogin();
  }
}
