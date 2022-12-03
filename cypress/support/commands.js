import "cypress-localstorage-commands";

export let token;
before(() => {
  cy.login();
  cy.saveLocalStorage();
  cy.getLocalStorage("token").then((response) => {
    token = response;
  });
});

const baseUrl = Cypress.env('API_BASE');

Cypress.Commands.add("validaContrato", (contrato, response) => {
  //pegar o arquivo (Schema) pasta fixtures e passar com parameto
  cy.fixture(contrato).then((contrato) => {
    // compilar esse arquivo, (jsonSchema)
    const validate = ajv.compile(contrato);
    // response  da api (validações)
    const responseApi = validate(response.body);

    // Validação (Error)
    if (!responseApi)
      cy.log(validate.errors).then(() => {
        throw new Error("Falha do contrato");
      });
  });
});

Cypress.Commands.add("atualizaFormulario", (idFormulario, payload) => {
  cy.request({
      method: 'PUT',
      url: `${baseUrl}/formulario`,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
      qs: {
        "idFormulario": idFormulario
      },
      body: payload,
      failOnStatusCode: false
    })
    .as('response').get('@response')
})

Cypress.Commands.add('login', () => {
  cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        "email": "admin@dbccompany.com.br",
        "senha": "admin123"
      },
      failOnStatusCode: false
    })
    .its("body")
    .then((response) => {
      cy.setLocalStorage("token", response.token)
    })
})
Cypress.Commands.add('loginColaborador', () => {
  cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        "email": "colab@dbccompany.com.br",
        "senha": "Fla@123456"
      },
      failOnStatusCode: false
    })
    .its("body")
    .then((response) => {
      cy.setLocalStorage("token", response.token)
    })
})