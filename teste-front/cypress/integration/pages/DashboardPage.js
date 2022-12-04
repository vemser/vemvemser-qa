import BasePage from "./BasePage";

const basePage = new BasePage();

// INPUTS
const nomeInput = "#dashboard-buscar-nome";
const nomeEditInput = "#editar-usuario-nome";
const emailInput = "#dashboard-buscar-email";
const emailEditInput = "#editar-usuario-email";
const emailPerfilInput = "#perfil-email";
const senhaEditInput = "#editar-usuario-senha";
const senhaConfirmacaoEditInput = "#editar-usuario-confirmar-senha";
const nomeNovoUsuarioInput = "#novo-usuario-nome";
const emailNovoUsuarioInput = "#novo-usuario-email";
const senhaNovoUsuarioInput = "#novo-usuario-senha";
const confirmacaoSenhaNovoUsuarioInput = "#novo-usuario-confirmar-senha";
const pesquisaInscricoesInput = "#registros-pesquisar";

// SELECT
const cargoSelect = "#dashboard-buscar-cargo";

// BUTTONS
const dashboardBtn =
  ".css-1o5pq7n > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiBox-root > .MuiList-root > :nth-child(1) > .MuiButtonBase-root";
const candidatosBtn =
  ".css-1o5pq7n > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiBox-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root";
const buscarBtn = "#dashboard-buscar-buscar";
const novoUsuarioBtn = ".css-1ok18ze > .MuiBox-root > .MuiButton-root";
const voltarBtn = "#drawerContainer-voltar";
const cadastrarBtn = "#novo-usuario-cadastrar";
const sairBtn =
  ".css-1o5pq7n > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiBox-root > .MuiButton-text";
const confirmarEditBtn = "#editar-usuario-editar";
const excluirBtn = "#editar-usuario-exccluir";
const excluirEditBtn = "#editar-usuario-exccluir";
const confirmarExcluirBtn =
  ".MuiDialogActions-root > .MuiButton-containedSecondary";
const naoExcluirBtn = "#editar-usuario-exccluir";
const buscarInscricoesBtn = ".css-1t62lt9 > .MuiButtonBase-root";
const perfilBtn = "#btn-perfil-page";
const perfilEditBtn = "#perfil-editar-btn";
const avaliacoesBtn =
  ".css-1o5pq7n > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiBox-root > .MuiList-root > :nth-child(3) > .MuiButtonBase-root";
const avaliarBtn = "#buttonAvaliar";
const excluirBtnInscricao = ".MuiButton-containedSecondary";
const confirmarExcluirBtnInscricao =
  ".MuiDialogActions-root > .MuiButton-containedSecondary";
const aprovarBtn = ".MuiList-root > [tabindex='0']";
const buscarBtnAvaliacao = ".css-1t62lt9 > .MuiButtonBase-root";
const resultadosBuscaAvaliacao =
  "[data-field='emailCandidato'] > .MuiDataGrid-cellContent";
const inscricoesBtn =
  ".css-1o5pq7n > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiBox-root > .MuiList-root > :nth-child(2) > .MuiButtonBase-root";

// RADIOS
const colaboradorRadio = ".css-1t62lt9 > :nth-child(1)";
const administradorRadio = ".css-1t62lt9 > :nth-child(2)";
const administradorEditRadio = "#editar-usuario-colaborador";
const colaboradorEditRadio = "#editar-usuario-administrador";

// ERRORS TEXTS
const nomeNovoErrorTxt = "#novo-usuario > :nth-child(1) > .MuiTypography-root";
const nomeEditErrorTxt =
  "#editar-usuario > :nth-child(1) > .MuiTypography-root";
const emailNovoErrorTxt = ":nth-child(2) > .MuiTypography-root";
const emailEditErrorTxt = ":nth-child(2) > .MuiTypography-root";
const emailEditError = "#edit-nome-email";
const emailPerfilError = ":nth-child(2) > .MuiTypography-root";
const senhaNovoErrorTxt = ":nth-child(3) > .MuiTypography-root";
const senhaEditErrorTxt = ":nth-child(3) > .MuiTypography-root";
const confirmacaoSenhaErrorTxt = ":nth-child(4) > .MuiTypography-root";
const confirmacaoSenhaEditErrorTxt = ":nth-child(4) > .MuiTypography-root";

// TEXT
const confirmDeleteInscricao = ".Toastify__toast-body > :nth-child(2)";
const nomeGestorTxt = "#header-gestor-nome";
const cargoGestorTxt = "#header-gestor-cargo";
const buscaNomeTxt = "[data-field='nome'] > .MuiDataGrid-cellContent";
const buscaEmailTxt = "[data-field='email'] > .MuiDataGrid-cellContent";
const cadastroSucessTxt = ".Toastify__toast-body > :nth-child(2)";
const deletarUserSucessTxt = ".Toastify__toast-body > :nth-child(2)";
const resultadoBusca = "[data-field='email'] > .MuiDataGrid-cellContent";
const resultadoBuscaInscricoes =
  "[data-field='email'] > .MuiDataGrid-cellContent";
export default class Dashboardpage {
  fillFieldNome(text) {
    basePage.fillInput(nomeInput, text);
  }

  fillFieldEmail(text) {
    basePage.fillInput(emailInput, text);
  }

  selectAdministrador() {
    basePage.select(cargoSelect, "Administrador");
  }

  selectColaborador() {
    basePage.select(cargoSelect, "Colaborador");
  }

  clickBtnSair() {
    basePage.click(sairBtn);
  }

  clickBtnNovoUsuario() {
    basePage.click(novoUsuarioBtn);
  }

  clickBtnCandidatos() {
    basePage.click(candidatosBtn);
  }

  clickBtnBuscar() {
    basePage.click(buscarBtn);
  }

  clickBtnInscricoes() {
    basePage.click(inscricoesBtn);
  }

  clickBtnDashboard() {
    basePage.click(dashboardBtn);
  }

  clickBtnVoltar() {
    basePage.click(voltarBtn);
  }

  clickBtnCadastrar() {
    basePage.click(cadastrarBtn);
  }

  clickBtnBuscarInscricao() {
    basePage.click(buscarInscricoesBtn);
  }

  clickRadioColaborador() {
    basePage.click(colaboradorRadio);
  }

  clickRadioAdministrador() {
    basePage.click(administradorRadio);
  }

  clickBtnConfimarEdit() {
    basePage.click(confirmarEditBtn);
  }

  clickBtnAvaliacoes() {
    basePage.click(avaliacoesBtn);
  }

  clickBtnPerfil() {
    basePage.click(perfilBtn);
  }

  clickBtnDeslogar() {
    basePage.click(sairBtn);
  }

  fillFieldNomeEdit(nome) {
    basePage.clearInput(nomeEditInput);
    basePage.fillInput(nomeEditInput, nome);
  }
  fillFieldEmailEdit(email) {
    basePage.clearInput(emailEditInput);
    basePage.fillInput(emailEditInput, email);
  }

  fillFieldNomeNovoUsuario(nome) {
    basePage.fillInput(nomeNovoUsuarioInput, nome);
  }

  fillFieldEmailNovoUsuario(email) {
    basePage.fillInput(emailNovoUsuarioInput, email);
  }

  fillFieldSenhaNovoUsuario(senha) {
    basePage.fillInput(senhaNovoUsuarioInput, senha);
  }

  fillFieldConfirmaSenhaNovoUsuario(senhaConfirmacao) {
    basePage.fillInput(confirmacaoSenhaNovoUsuarioInput, senhaConfirmacao);
  }

  fillFieldPesquisaInscricoes(email) {
    basePage.fillInput(pesquisaInscricoesInput, email);
  }

  clickBtnBuscarInscricao() {
    basePage.click(buscarInscricoesBtn);
  }

  validateBuscarGestorNome(nome) {
    basePage.time(2000);
    basePage.validateText(buscaNomeTxt, nome);
  }

  validateBuscarGestorEmail(email) {
    basePage.time(2000);
    basePage.validateText(buscaEmailTxt, email);
  }

  validateIsNotVisibleExcluir() {
    basePage.validateNotExist(excluirEditBtn);
  }

  validateAdministradorLogado() {
    basePage.time(2000);
    basePage.validateText(cargoGestorTxt, "administrador");
  }

  validateCadastroComSucesso() {
    basePage.time(2000);
    basePage.validateText(cadastroSucessTxt, "Usuário cadastrado com sucesso");
  }

  validateCadastroInvalido() {
    basePage.time(2000);
    basePage.validateText(nomeNovoErrorTxt, "O nome é obrigatório");
    basePage.validateText(
      emailNovoErrorTxt,
      "Só é válido o email com @dbccompany.com.br"
    );
    basePage.validateText(
      senhaNovoErrorTxt,
      "A senha deve ter no mínimo 8 caracteres"
    );
    basePage.validateText(
      confirmacaoSenhaErrorTxt,
      "A confirmação de senha é obrigatória"
    );
  }

  validateColaboradorLogado() {
    basePage.validateText(cargoGestorTxt, "colaborador");
  }

  validateDeletarUserSucesso() {
    basePage.validateText(deletarUserSucessTxt, "Usuário deletado com sucesso");
  }
  validateErrorNomeNovoUsuario() {
    basePage.validateText(nomeNovoErrorTxt, "O nome é obrigatório");
  }
  validateErrorEmailNovoUsuario() {
    basePage.validateText(
      emailNovoErrorTxt,
      "Só é válido o email com @dbccompany.com.br"
    );
  }
  validateErrorSenhaNovoUsuario() {
    basePage.validateText(
      senhaNovoErrorTxt,
      "A senha deve ter no mínimo 8 caracteres"
    );
  }
  validateErrorSenhaConfirmacaoNovoUsuario() {
    basePage.validateText(
      confirmacaoSenhaErrorTxt,
      "A confirmação de senha é obrigatória"
    );
  }

  validateErrorSenhasDiferentes() {
    basePage.validateText(
      confirmacaoSenhaErrorTxt,
      "As senhas devem ser iguais"
    );
  }

  deleteNovoUser() {
    basePage.time(2000);
    basePage.click(excluirBtn);
    basePage.click(confirmarExcluirBtn);
  }

  createNovoAdministrador(newUser) {
    this.clickBtnNovoUsuario();
    this.fillFieldNomeNovoUsuario(newUser.name);
    this.fillFieldEmailNovoUsuario(newUser.email);
    this.fillFieldSenhaNovoUsuario(newUser.password);
    this.fillFieldConfirmaSenhaNovoUsuario(newUser.password);
    this.clickRadioAdministrador();
    this.clickBtnCadastrar();
  }

  createNovoColaborador(newUser) {
    this.clickBtnNovoUsuario();
    this.fillFieldNomeNovoUsuario(newUser.name);
    this.fillFieldEmailNovoUsuario(newUser.email);
    this.fillFieldSenhaNovoUsuario(newUser.password);
    this.fillFieldConfirmaSenhaNovoUsuario(newUser.password);
    this.clickRadioColaborador();
    this.clickBtnCadastrar();
  }

  createNovoColaboradorInvalido() {
    this.clickBtnNovoUsuario();
    this.clickRadioColaborador();
    this.clickBtnCadastrar();
  }

  listGestor(user) {
    basePage.clearInput(nomeInput);
    this.fillFieldNome(user.name);
    basePage.clearInput(emailInput);
    this.fillFieldEmail(user.email);
    this.clickBtnBuscar();
    basePage.time(2000);
    basePage.click(resultadoBusca);
  }

  listColaborador(user) {
    basePage.clearInput(nomeInput);
    this.fillFieldNome(user.name);
    basePage.clearInput(emailInput);
    this.fillFieldEmail(user.email);
    this.selectColaborador();
    this.clickBtnBuscar();
    basePage.time(2000);
    basePage.click(resultadoBusca);
  }

  editGestor(userEdit) {
    this.fillFieldNomeEdit(userEdit.name);
    this.fillFieldEmailEdit(userEdit.email);
    this.clickBtnConfimarEdit();
  }

  validateEditErrorEmailNaoDBC() {
    basePage.validateText(
      emailEditErrorTxt,
      "Só é válido o email com @dbccompany.com.br"
    );
  }

  validateDeleteInscricao() {
    basePage.validateText(
      confirmDeleteInscricao,
      "Você deletou todos os dados desse candidato!"
    );
  }

  validatePerfilEditErrorEmailNaoDBC(userNaoDBC) {
    this.fillFieldEmailEdit(userNaoDBC.email);
    basePage.click(confirmarEditBtn);
    basePage.validateText(
      emailEditError,
      "Só é válido o email com @dbccompany.com.br"
    );
    this.deleteNovoUser();
  }

  validatePerfilErrorEmailNaoDBC(userNaoDBC) {
    this.clickBtnPerfil(perfilBtn);
    this.clickBtnVoltar();
    this.clickBtnPerfil(perfilBtn);
    basePage.clearInput(emailPerfilInput);
    basePage.fillInput(emailPerfilInput, userNaoDBC.email);
    basePage.click(perfilEditBtn);
    basePage.validateText(
      emailPerfilError,
      "Só é válido o email com @dbccompany.com.br"
    );
  }

  listInscricao(email) {
    this.clickBtnInscricoes();
    this.fillFieldPesquisaInscricoes(email);
    this.clickBtnBuscarInscricao();
    basePage.time(3000);
    this.clickResultadoBuscaInscricoes();
  }

  evaluateInscricoes() {
    basePage.click(avaliarBtn);
    basePage.time(2000);
    basePage.click(aprovarBtn);
    this.clickBtnVoltar();
  }

  clickResultadoBuscaInscricoes() {
    basePage.click(resultadoBuscaInscricoes);
  }

  clickBtnBuscarAvaliacao() {
    basePage.click(buscarBtnAvaliacao);
  }

  clickResultadoBuscaAvaliacao() {
    basePage.click(resultadosBuscaAvaliacao);
  }

  deletarInscricao(email) {
    this.clickBtnAvaliacoes();
    this.fillFieldPesquisaInscricoes(email);
    this.clickBtnBuscarAvaliacao();
    basePage.time(2000);
    this.clickResultadoBuscaAvaliacao();
    basePage.click(excluirBtnInscricao);
    basePage.click(confirmarExcluirBtnInscricao);
  }
}
