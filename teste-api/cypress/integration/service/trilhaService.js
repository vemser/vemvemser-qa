import {
    token
} from "../../support/commands";

const baseUrl = Cypress.env('API_BASE');

export default class Trilha {

    listas() {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/trilha/listar`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    }
}