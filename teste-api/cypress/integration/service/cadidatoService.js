import {
    token
} from "../../support/commands";

const baseUrl = Cypress.env('API_BASE');



export default class Candidato {

    candidatoCadastro(nome, dataNascimento, email, telefone, rg, cpf, estado, cidade, pcdboolean, idFormulario) {
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/candidato/cadastro`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: {
                "nome": nome,
                "dataNascimento": dataNascimento,
                "email": email,
                "telefone": telefone,
                "rg": rg,
                "cpf": cpf,
                "estado": estado,
                "cidade": cidade,
                "pcdboolean": pcdboolean,
                "idFormulario": idFormulario
            },
            failOnStatusCode: false
        })
    }

    candidatoDeletar(idCandidato) {
        return cy.request({
            method: 'DELETE',
            url: `${baseUrl}/candidato/deletar`,
            qs: {
                "idCandidato": idCandidato
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            failOnStatusCode: false
        })
    }

    candidatoAtualizar(idCandidato, nome, dataNascimento, email, telefone, rg, cpf, estado, cidade, pcdboolean, idFormulario) {
        return cy.request({
            method: 'PUT',
            url: `${baseUrl}/candidato/update`,
            qs: {
                "idCandidato": idCandidato
            },
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: {
                "nome": nome,
                "dataNascimento": dataNascimento,
                "email": email,
                "telefone": telefone,
                "rg": rg,
                "cpf": cpf,
                "estado": estado,
                "cidade": cidade,
                "pcdboolean": pcdboolean,
                "idFormulario": idFormulario
            },
            failOnStatusCode: false
        })
    }
    candidatoListar() {
        return cy.request({
            method: 'GET',
            url: `${baseUrl}/candidato/listar`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            failOnStatusCode: false
        })
    }




    gerarCPF() {
        const rnd = (n) => Math.round(Math.random() * n);
        const mod = (base, div) => Math.round(base - Math.floor(base / div) * div)
        const n = Array(9).fill('').map(() => rnd(9));

        let d1 = n.reduce((total, number, index) => (total + (number * (10 - index))), 0)
        d1 = 11 - mod(d1, 11);
        if (d1 >= 10) d1 = 0;

        let d2 = (d1 * 2) + n.reduce((total, number, index) => (total + (number * (11 - index))), 0)
        d2 = 11 - mod(d2, 11);
        if (d2 >= 10) d2 = 0;

        return `${n.join('')}${d1}${d2}`
    }
}