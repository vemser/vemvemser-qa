const baseUrl = Cypress.env('API_BASE');
let token = 0;

export default class Inscricao {

    inscricaoCriar(idFormulario, idCandidato, avaliacao) {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/inscricao`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: {
                "idFormulario": idFormulario,
                "idCandidato": idCandidato,
                "avaliacao": avaliacao
            },
            failOnStatusCode: false
        });
    }

    inscricaoDeletar(idInscricao) {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/inscricao/${idInscricao}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    }

    inscricaoListarTodas() {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/inscricao`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    }

    inscricaoListarIndividual(idInscricao) {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/inscricao/${idInscricao}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    }

    inscricaoAtualizart(idInscricao, idFormulario, idCandidato, avaliacao) {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/inscricao/${idInscricao}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: {
                "idFormulario": idFormulario,
                "idCandidato": idCandidato,
                "avaliacao": avaliacao
            },
            failOnStatusCode: false
        });
    }

}