import {
    faker
} from "@faker-js/faker";

import Gestor from "../../service/gestorService";
const gestor = new Gestor;


context('Gestor', () => {
    context('Listar Gestor', () => {
        it('GET - Deve listar todos os gestores do banco de dados ', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Lista todos os gestores no banco de dados')
                .story('Nenhum dado necessário')
            gestor.gestorRequest()
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body[0]).to.have.property('nome');
                    expect(response.body[0]).to.have.property('idGestor');
                })
        });
    })

    context('Adicionar Gestor', () => {
        it('POST - Deve adicionar um novo gestor', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Adicionar um novo gestor no banco de dados')
                .story('Passando todos os dados corretos')

            //Gerando novos dados
            let nome = faker.name.firstName();
            let email = faker.internet.email();
            let senha = faker.internet.password();
            let tipoCargo = 1;

            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('idGestor');
                    expect(response.body.nome).to.eq(nome);

                    //Deletando usuário criado
                    let idCriado = response.body.idGestor;
                    gestor.gestorDeletar(idCriado)
                        .then((response) => {
                            expect(response.status).to.eq(204)
                        })
                })
        });

        it('POST - Testar adicionar gestor sem passar payload no body', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Adicionar um novo gestor no banco de dados')
                .story('Sem passar payload')

            gestor.gestorCadastroSemPayload()
                .then((response) => {
                    expect(response.status).to.eq(400)
                })
        });
        it('POST - Testar adicionar gestor com dados vazios', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Adicionar um novo gestor no banco de dados')
                .story('Dados vazios')

            //Gerando dados vazios;
            let nome;
            let email;
            let senha;
            let tipoCargo;
            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(400);
                })
        });

        it('POST - Testar adicionar um gestor com nome inválido', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Adicionar um novo gestor no banco de dados')
                .story('Passando nome inválido')

            //Gerando novos dados
            let nome = 10;
            let email = faker.internet.email();
            let senha = faker.internet.password();
            let tipoCargo = 1;

            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body.errors).to.contain("nome: O nome deve ter de 3 a 255 caracteres")
                })
        });

        it('POST - Testar adicionar um gestor com nome menor que 3 caracteres', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Adicionar um novo gestor no banco de dados')
                .story('Passando nome menor que 3 caracteres')

            //Gerando novos dados
            let nome = 'Al';
            let email = faker.internet.email();
            let senha = faker.internet.password();
            let tipoCargo = 1;

            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body.errors).to.contain("nome: O nome deve ter de 3 a 255 caracteres")
                })
        });
        it('POST - Testar adicionar um gestor com email inválido', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Adicionar um novo gestor no banco de dados')
                .story('Passando email inválido')

            //Gerando novos dados
            let nome = faker.name.firstName();
            let email = 0;
            let senha = faker.internet.password();
            let tipoCargo = 1;

            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(500);
                })
        });
    })

    context('Deletar gestor', () => {
        it('DELETE - Deve deletar um Gestor corretamente', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Deletar um gestor do banco de dados')
                .story('Passando ID correto')


            //Criando um novo gestor
            let nome = faker.name.firstName();
            let email = faker.internet.email();
            let senha = faker.internet.password();
            let tipoCargo = 1;
            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    let idCriado = response.body.idGestor;


                    //Deletando o usuário criado
                    gestor.gestorDeletar(idCriado)
                        .then((response) => {
                            expect(response.status).to.eq(204)
                        })
                })
        });

        it('DELETE - Testar deletar um gestor passando ID inexistente', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Deletar um gestor do banco de dados')
                .story('Passando ID inexistente')

            gestor.gestorDeletar(0)
                .then((response) => {
                    expect(response.status).to.eq(400)
                    expect(response.body.message).to.contain("Usuario não encontrado!")
                })
        });

        it('DELETE - Testar deletar um gestor passando ID inválido', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Deletar um gestor do banco de dados')
                .story('Passando ID inválido')

            gestor.gestorDeletar(NaN)
                .then((response) => {
                    expect(response.status).to.eq(400)
                })
        });
    })

    context('Atualizar gestor', () => {
        it('PUT - Deve atualizar um gestor corretamente', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Atualizar um gestor do banco de dados')
                .story('Todos os dados corretos')

            //Criando um gestor
            let nome = faker.name.firstName();
            let email = faker.internet.email();
            let senha = faker.internet.password();
            let tipoCargo = 1;
            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    let idCriado = response.body.idGestor;

                    //Gerando novos dados para atualizar
                    nome = faker.name.firstName();
                    email = faker.internet.email();
                    senha = faker.internet.password();
                    tipoCargo = 1;
                    gestor.gestorAtualizar(idCriado, nome, email, senha, tipoCargo)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            expect(response.body.nome).to.eq(nome)

                            gestor.gestorDeletar(response.body.idGestor)
                                .then((response) => {
                                    expect(response.status).to.eq(204)
                                })
                        })
                })
        });

        it('PUT - Testar atualizar pessoa sem passar ID', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Atualizar um gestor do banco de dados')
                .story('Passando ID inexistente')


            let nome = faker.name.firstName();
            let email = faker.internet.email();
            let senha = faker.internet.password();
            let tipoCargo = 1;
            gestor.gestorAtualizar(0, nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(400)
                })
        });

        it('PUT - Testar atualizar pessoa dados vazios ', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Atualizar um gestor do banco de dados')
                .story('Passando dados vazios')

            let nome = faker.name.firstName();
            let email = faker.internet.email();
            let senha = faker.internet.password();
            let tipoCargo = 1;
            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    let idCriado = response.body.idGestor;

                    //Gerando novos dados para atualizar
                    nome = " ";
                    email = " ";
                    senha = " ";
                    tipoCargo = 1;
                    gestor.gestorAtualizar(idCriado, nome, email, senha, tipoCargo)
                        .then((response) => {
                            expect(response.status).to.eq(400)

                            gestor.gestorDeletar(idCriado)
                                .then((response) => {
                                    expect(response.status).to.eq(204)
                                })
                        })
                })
        })


    })
})