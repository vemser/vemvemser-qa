const baseUrl = Cypress.env('API_BASE');
let token = 0;
import {
    faker
} from '@faker-js/faker';
export default class Gestor {

    gestorRequest() {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/Gestor`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        })
    }

    gestorCadastro(nome, email, senha, tipoCargo) {
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/Gestor/cadastro`,
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

    gestorCadastroSemPayload() {
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/Gestor/cadastro`,
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
            url: `${baseUrl}/Gestor/${id}`,
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
            url: `${baseUrl}/Gestor/${id}`,
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
}