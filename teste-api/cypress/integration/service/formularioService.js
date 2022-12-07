const baseUrl = Cypress.env('API_BASE');

import {
    token
} from "../../support/commands";
export let idForm;
export default class Formulario {

    formularioCadastro(payload) {
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/formulario/cadastro`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: payload,
            failOnStatusCode: false
        })
    }

    formularioDelete(idFormulario) {
        return cy.request({
            method: 'DELETE',
            url: `${baseUrl}/formulario`,
            qs: {
                "idFormulario": idFormulario
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        })
    }

    formularioListarTodos(pagina, tamanho, sort, order) {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/formulario/listar`,
            qs: {
                "pagina": pagina,
                "tamanho": tamanho,
                "sort": sort,
                "order": order
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        })
    }

    formularioListarIndividual(idFormulario) {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/formulario/get-curriculo-by-id-formulario`,
            qs: {
                "idFormulario": idFormulario
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    }

    formularioAtualizar(idFormulario, payload) {
        return cy.request({
            method: 'PUT',
            url: `${baseUrl}/formulario`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            qs: {
                "idFormulario": idFormulario
            },
            body: payload,
            failOnStatusCode: false
        })
    }

}