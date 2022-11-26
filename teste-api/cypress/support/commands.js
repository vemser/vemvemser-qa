before(() => {
  //cy.login();
});

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