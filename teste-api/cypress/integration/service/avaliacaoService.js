import {
    token
} from "../../support/commands";
import Inscricao from "./inscricaoService";

const baseUrl = Cypress.env('API_BASE');

const inscricao = new Inscricao
export default class Avaliacao {

    avaliacaoCadastro(aprovado, idInscricao) {
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/avaliacao`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: {
                "aprovadoBoolean": aprovado,
                "idInscricao": idInscricao
            },
            failOnStatusCode: false
        });
    }

    avaliacaoDeletar(idAvaliacao) {
        return cy.request({
            method: 'DELETE',
            url: `${baseUrl}/avaliacao`,
            qs: {
                "idAvaliacao": idAvaliacao
            },
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        });
    }

    avaliacaoListar() {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/avaliacao`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        });
    }
    listarPorEmail(emailAvaliacao) {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/avaliacao/buscar-by-email`,
            qs: {
                "email": emailAvaliacao
            },
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        });
    }

    avaliacaoAtualizar(idAvaliacao, aprovado, idInscricao) {
        return cy.request({
            method: 'PUT',
            url: `${baseUrl}/avaliacao`,
            qs: {
                "idAvaliacao": idAvaliacao
            },
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: {
                "aprovadoBoolean": aprovado,
                "idInscricao": idInscricao
            },
            failOnStatusCode: false
        });
    }
}