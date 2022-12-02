import {
    token
} from "../../support/commands";

const baseUrl = Cypress.env('API_BASE');

export default class Inscricao {

    inscricaoCriar(idCandidato) {
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/inscricao/cadastro`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: {
                "idCandidato": idCandidato,
            },
            failOnStatusCode: false
        });
    }

    inscricaoDeletar(idInscricao) {
        return cy.request({
            method: 'DELETE',
            url: `${baseUrl}/inscricao`,
            qs: {
                "id-inscricao": idInscricao
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    }

    inscricaoListarTodas() {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/inscricao`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    }

    inscricaoListarPorId(idInscricao) {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/inscricao/by-id`,
            qs: {
                "id": idInscricao
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    }
    buscarPorEmail(email) {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/inscricao/buscar-by-email`,
            qs: {
                "email": email
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    }

}