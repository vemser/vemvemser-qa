import {
    faker
} from "@faker-js/faker";
import Candidato from "../../service/cadidatoService";
import Formulario from "../../service/formularioService";

const candidato = new Candidato
const formulario = new Formulario
const formBody = require('../../../fixtures/formulario.payload.json')

context('Avaliação', () => {
    context('Criar inscrição', () => {
        it('POST - Deve criar nova avaliação no banco de dados', () => {
            cy.allure()
                .epic('Avaliação')
                .feature('Criar uma nova avaliação')
                .story('Todos os dados corretos')

        });
    })
})