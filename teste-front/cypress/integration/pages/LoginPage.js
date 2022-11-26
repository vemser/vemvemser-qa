import BasePage from "./BasePage";

const basePage = new BasePage();

const email = "#email"
const password = "#password"
const btnLogin = "#btn-login"
const btnRegister = "#register"

export default class LoginPage {


    preencherCampoEmail(text) {
        basePage.preencherInput(email, text)
    }

    preencherCampoPassword(text) {
        basePage.preencherInput(password, text)
    }

    clicarBtnFazerLogin() {
        basePage.click(btnLogin)
    }

    clicarBtnRegistrar() {
        basePage.click(btnRegister)
    }

   /*  validarContaLogada(text) {
        basePage.validarText(campoExibicaoContaLogada, "Olá, "+text)
    }

    validarMsgErrorEmailNaoPossuiConta() {
        basePage.validarText(msgErroEmailNaoExisteBaseDados, 'Não encontramos uma conta associada a este endereço de e-mail')
    }

    validarMsgErrorSenhaIncorreta() {
        basePage.validarText(msgErroSenhaIncorreta, 'Sua senha está incorreta')
    }


    // FUNCIONALIDADE CRIAR CONTA 

    preencherCampoNome(text) {
        basePage.preencherInput(campoNome, text)
    }

    preencherCampoEmail(text) {
        basePage.preencherInput(campoEmail, text)
    }

    preencherCampoSenhaCriacao(text) {
        basePage.preencherInput(campoSenha, text)
    }

    preencherCampoConfimarSenhaCriacao(text) {
        basePage.preencherInput(campoConfirmarSenha, text)
    }

    clicarBtnContinuarCriacaoConta() {
        basePage.click(btnContinuarCriacaoConta)
    }

    validarErroEmailCadastrado(text) {
        basePage.validarText(campoMsgErrorEmailCadastrado, text)
    }

    validarErroSenhaDiferentes(text) {
        basePage.validarText(campoErroSenhasDiferentes, text)
    }
 */
}