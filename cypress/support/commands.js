before(() => {
  //cy.login();
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