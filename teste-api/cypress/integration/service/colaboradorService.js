const baseUrl = Cypress.env('API_BASE');
let tokenColaborador;

before(() => {
    cy.clearLocalStorage();
    cy.reload();
    cy.loginColaborador();
    cy.saveLocalStorage();
    cy.getLocalStorage("token").then((response) => {
        tokenColaborador = response;
    });
});
export default class Colaborador {
    cadastro(nome, email, senha, tipoCargo) {
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/gestor/cadastro`,
            headers: {
                Authorization: tokenColaborador,
                'Content-Type': 'application/json'
            },
            body: {
                "nome": nome,
                "email": email,
                "senha": senha,
                "tipoCargo": tipoCargo
            },
            failOnStatusCode: false
        });
    }

    delete(idGestor) {
        return cy.request({
            method: 'DELETE',
            url: `${baseUrl}/gestor/${idGestor}`,
            headers: {
                Authorization: tokenColaborador,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        });
    }

    atualiza(idGestor, nome, email, senha, tipoCargo) {
        return cy.request({
            method: 'PUT',
            url: `${baseUrl}/gestor/${idGestor}`,
            headers: {
                Authorization: tokenColaborador,
                'Content-Type': 'application/json'
            },
            body: {
                "nome": nome,
                "email": email,
                "senha": senha,
                "tipoCargo": tipoCargo
            },
            failOnStatusCode: false
        });
    }
}