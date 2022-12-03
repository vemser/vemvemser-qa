import {
    faker
} from "@faker-js/faker";
import Colaborador from "../../service/colaboradorService";
import Gestor from "../../service/gestorService";

const colaborador = new Colaborador
const gestor = new Gestor
context('CRUD - Colaborador', () => {
    context('Criar colaborador', () => {
        it('POST - Tentar criar gestor com conta de colaborador | Retorna mensagem de erro', () => {
            cy.allure()
                .epic('Colaborador')
                .feature('Tentar criar gestor')
                .story('Todos os dados corretos')

            colaborador.cadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(403)
                })
        });
    })

    context('Deletar colaborador', () => {
        it('DELETE - Tentar deletar gestor com conta de colaborador | Retorna mensagem de erro', () => {
            cy.allure()
                .epic('Colaborador')
                .feature('Tentar deletar gestor')
                .story('Todos os dados corretos')

            gestor.gestorCadastro("Marco Polo", "marco.polo@dbccompany.com.br", "senhaDIFICIL*0001", 2)
                .then((response) => {
                    colaborador.delete(response.body.idGestor)
                        .then((response) => {
                            expect(response.status).to.eq(403)
                        })
                    gestor.gestorDeletar(response.body.idGestor)
                })
        });
    })

    context('Editar colaborador', () => {
        it('PUT - Tentar editar um gestor com conta de colaborador | Retorna mensagem de erro', () => {
            cy.allure()
                .epic('Colaborador')
                .feature('Tentar editar gestor')
                .story('Todos os dados corretos')

            gestor.gestorCadastro("Marco Polo", "marco.polo@dbccompany.com.br", "senhaDIFICIL*0001", 2)
                .then((response) => {
                    colaborador.atualiza(response.body.idGestor, "Igor", "eu.igor@dbccompany.com.br", "outraSENHAdificil**3000", 2)
                        .then((response) => {
                            expect(response.status).to.eq(403)
                        })
                    gestor.gestorDeletar(response.body.idGestor)
                })
        });
    })
})

let nome = "Novo nome";
let email = `${faker.name.lastName()}@dbccompany.com.br`;
let senha = "SENHAsenha*123";
let tipoCargo = 1;