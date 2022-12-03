import {
    token
} from "../../support/commands";

const baseUrl = Cypress.env('API_BASE');
export default class Gestor {

    gestorRequest() {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/gestor`,
            qs: {

            },
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        })
    }

    gestorLogar(email, senha) {
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/Gestor`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: {
                "email": email,
                "senha": senha
            },
            failOnStatusCode: false
        })
    }

    gestorCadastro(nome, email, senha, tipoCargo) {
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/gestor/cadastro`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: {
                "nome": nome,
                "email": email,
                "senha": senha,
                "tipoCargo": tipoCargo
            },
            failOnStatusCode: false
        })
    }

    gestorCadastroSemPayload() {
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/gestor/cadastro`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        })
    }

    gestorDeletar(id) {
        return cy.request({
            method: 'DELETE',
            url: `${baseUrl}/gestor/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        })
    }

    gestorAtualizar(id, nome, email, senha, tipoCargo) {
        return cy.request({
            method: 'PUT',
            url: `${baseUrl}/gestor/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: {
                "nome": nome,
                "email": email,
                "senha": senha,
                "tipoCargo": tipoCargo
            },
            failOnStatusCode: false
        })
    }

    gestorListarPorId(id) {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/gestor/id-gestor`,
            qs: {
                "idGestor": id
            },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        });
    }

    gestorListarInativas() {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/gestor/contas-inativas`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        });
    }

    desativarConta(idGestor) {
        return cy.request({
            method: 'PUT',
            url: `${baseUrl}/gestor/desativacao-conta/${idGestor}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        });
    }

    trocarSenha(idGestor) {
        return cy.request({
            method: 'PUT',
            url: `${baseUrl}/gestor/trocar-senha/${idGestor}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        });
    }

    listarLogado() {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/gestor/gestor-logado`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        });
    }
}