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
                    expect(response.body.elementos[0]).to.have.property('nome');
                    expect(response.body.elementos[0]).to.have.property('idGestor');
                })
        });

        context('Listar logado', () => {
            it('GET - Deve listar o gestor logado', () => {
                cy.allure()
                    .epic('Gestor')
                    .feature('Lista o gestor logado')
                    .story('Nenhum dado necessário')

                gestor.listarLogado()
                    .then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body).to.have.any.keys("idGestor")
                        expect(response.body).to.have.any.keys("nome")
                        expect(response.body).to.have.any.keys("email")
                    })
            });
        })
    })
    context('Listar gestor por id', () => {
        it('GET - Deve listar o gestor passando ID', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Listar gestor no banco de dados passando ID')
                .story('Id correto')
            let nome = faker.name.firstName();
            let email = `${faker.name.lastName()}.${faker.name.firstName()}@dbccompany.com.br`;
            let senha = faker.internet.password();
            let tipoCargo = 1;

            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('idGestor');
                    expect(response.body.nome).to.eq(nome);

                    let idCriado = response.body.idGestor
                    gestor.gestorListarPorId(idCriado)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            expect(response.body).to.have.property('idGestor');
                            expect(response.body).to.have.property('nome')
                            gestor.gestorDeletar(response.body.idGestor)
                                .then((response) => {
                                    expect(response.status).to.eq(204)
                                })
                        })
                })
        });

        it('GET - Testar listar gestor passando id inexistente', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Listar gestor no banco de dados passando ID')
                .story('Id correto')

            let nome = faker.name.firstName();
            let email = `${faker.name.lastName()}.${faker.name.firstName()}@dbccompany.com.br`;
            let senha = faker.internet.password();
            let tipoCargo = 1;

            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    gestor.gestorDeletar(response.body.idGestor)
                        .then((response) => {
                            expect(response.status).to.eq(204)
                        })
                    gestor.gestorListarPorId(response.body.idGestor)
                        .then((response) => {
                            expect(response.status).to.eq(400)
                            expect(response.body.message).to.contain("Usuario não encontrado!")
                        })
                })

        });

        it('GET - Testar listar gestor passando id inválido', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Listar gestor no banco de dados passando ID')
                .story('Id inválido')
            gestor.gestorListarPorId(NaN)
                .then((response) => {
                    expect(response.status).to.eq(400)
                })
        });
    })

    context('Desativação de conta', () => {
        it('PUT - Deve desativar uma conta', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Desativar uma conta')
                .story('Todos os dados corretos')

            gestor.gestorCadastro(
                    faker.name.firstName(),
                    `${faker.name.lastName()}@dbccompany.com.br`,
                    "senhaDificil123",
                    2
                )
                .then((response) => {
                    expect(response.status).to.eq(200);
                    gestor.desativarConta(response.body.idGestor)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                    gestor.gestorDeletar(response.body.idGestor)
                })
        });

        it('PUT - Tentar desativar conta inexistente', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Desativar uma conta')
                .story('Todos os dados corretos')

            gestor.gestorCadastro(
                    faker.name.firstName(),
                    `${faker.name.lastName()}@dbccompany.com.br`,
                    "senhaDificil123",
                    2
                )
                .then((response) => {
                    expect(response.status).to.eq(200);
                    let idGestor = response.body.idGestor;
                    gestor.gestorDeletar(idGestor)
                    gestor.desativarConta(idGestor)
                        .then((response) => {
                            expect(response.status).to.eq(400)
                        })
                })
        });
    })

    context('Listar contas inativas', () => {
        it('GET - Listar todas as contas inativas', () => {
            cy.allure()
                .epic('Gestor')
                .feature('Listar contas inativas')
                .story('Nenhum dado necessário')
            gestor.gestorListarInativas()
                .then((response) => {
                    expect(response.status).to.eq(200)
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
            let email = `${faker.name.lastName()}.${faker.name.firstName()}@dbccompany.com.br`;
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
            let email = `${faker.name.lastName()}.${faker.name.firstName()}@dbccompany.com.br`;
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
            let email = `${faker.name.lastName()}.${faker.name.firstName()}@dbccompany.com.br`;
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
                    expect(response.status).to.be.oneOf([400, 500]);
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
            let email = `${faker.name.lastName()}.${faker.name.firstName()}@dbccompany.com.br`;
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
            let email = `${faker.name.lastName()}.${faker.name.firstName()}@dbccompany.com.br`;
            let senha = faker.internet.password();
            let tipoCargo = 1;
            gestor.gestorCadastro(nome, email, senha, tipoCargo)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    let idCriado = response.body.idGestor;

                    //Gerando novos dados para atualizar
                    nome = faker.name.firstName();
                    let email = `${faker.name.lastName()}.${faker.name.firstName()}@dbccompany.com.br`;
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
            let email = `${faker.name.lastName()}.${faker.name.firstName()}@dbccompany.com.br`;
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
            let email = `${faker.name.lastName()}.${faker.name.firstName()}@dbccompany.com.br`;
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