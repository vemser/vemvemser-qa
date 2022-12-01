import Trilha from "../../service/trilhaService"

const trilha = new Trilha

context('Trilha', () => {
    context('Listar trilhas', () => {
        it('GET - Listar todas as trilhas', () => {
            cy.allure()
                .epic('Trilhas')
                .feature('Listar todas as trilhas')
                .story('Nenhum dado necessario')

            trilha.listas()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body[0]).to.have.any.keys("idTrilha")
                    expect(response.body[0]).to.have.any.keys("nome")
                })
        });
    })
})