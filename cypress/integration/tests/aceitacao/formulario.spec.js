import Formulario from "../../service/formularioService";

let idForm;
const formulario = new Formulario;
const formBody = require('../../../fixtures/formulario.payload.json')
const formSemCurso = require('../../../fixtures/formularioSemCurso.payload.json')
const formSemInst = require('../../../fixtures/formularioSemInstituicao.payload.json')
const formSemMatri = require('../../../fixtures/formSemMatricula.payload.json')
const formVazio = require('../../../fixtures/formVazio.payload.json')
const formNull = require('../../../fixtures/formInvalido.payload.json')

context('Formulário', () => {
    context('Criar formulário', () => {
        it('POST - Deve criar um novo formulário corretamente', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Criar um novo formulário')
                .story('Todos os dados corretos')
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)

                })
        });
        it('POST - Testar criar um formulário sem payload', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Criar um novo formulário')
                .story('Todos os dados vazios')
            formulario.formularioCadastro(formVazio)
                .then((response) => {
                    expect(response.status).to.be.oneOf([500, 400])
                })
        });
        it('POST - Testar criar um formulário sem estar matriculado', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Criar um novo formulário')
                .story('Não matriculado')
            formulario.formularioCadastro(
                    formSemMatri
                )
                .then((response) => {
                    expect(response.status).to.eq(400)
                })
        });
        it('POST - Testar criar formulário sem digitar curso', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Criar um novo formulário')
                .story('Não preechendo o curso')
            formulario.formularioCadastro(
                    formSemCurso
                )
                .then((response) => {
                    expect(response.status).to.be.oneOf([400, 500])
                })
        });
        it('POST - Testar criar formulário sem preencher instituição', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Criar um novo formulário')
                .story('Não preechendo instituição de ensino')
            formulario.formularioCadastro(formSemInst)
                .then((response) => {
                    expect(response.status).to.be.oneOf([500, 400])
                })
        });
    })
    context('Deletar formulário', () => {
        it('DELETE - Deve deletar um formulário do banco de dados', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Deletar formulário')
                .story('Todos os dados corretos')

            //criando um novo formulário
            formulario.formularioCadastro(
                    formBody
                )
                .then((response) => {
                    expect(response.status).to.eq(200)
                    formulario.formularioDelete(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                });
        })

        it('DELETE - Testar deletar formulário com id inexistente', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Deletar formulário')
                .story('Passando ID inexistente')
            formulario.formularioDelete(0)
                .then((response) => {
                    expect(response.status).to.be.oneOf([500, 400]);
                })
        });
        it('DELETE - Testar deletar formulário com id inválido', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Deletar formulário')
                .story('Passando ID inválido')
            formulario.formularioDelete(NaN)
                .then((response) => {
                    expect(response.status).to.be.oneOf([500, 400]);
                })
        });
    });
    context('Atualizar formulário', () => {
        it('PUT - Deve atualizar um formulário existente', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Atualizar formulário')
                .story('Todos os dados corretos')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    idForm = (response.body.idFormulario)
                    formulario.formularioAtualizar(idForm, formBody)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            formulario.formularioDelete(response.body.idFormulario)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                })

        });

        it('PUT - Tentar atualizar formulários com campos vazios', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Atualizar formulário')
                .story('Todos os campos vazios')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    idForm = (response.body.idFormulario)
                    formulario.formularioAtualizar(idForm, formVazio)
                        .then((response) => {
                            expect(response.status).to.be.oneOf([500, 400])
                            formulario.formularioDelete(idForm)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })

                })
        });

        it('PUT - Tentar atualizar formulário com campos inválidos', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Atualizar formulário')
                .story('Todos os campos inválidos')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    idForm = (response.body.idFormulario)
                    formulario.formularioAtualizar(idForm, formNull)
                        .then((response) => {
                            expect(response.status).to.be.oneOf([500, 400])
                            formulario.formularioDelete(idForm)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                })
        });

        it('PUT - Tentar atualizar formulário com ID inexistente', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Atualizar formulário')
                .story('ID inexistente')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    idForm = (response.body.idFormulario)
                    formulario.formularioAtualizar(0, formBody)
                        .then((response) => {
                            expect(response.status).to.be.oneOf([500, 400])
                            formulario.formularioDelete(idForm)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                })
        });

        it('PUT - Tentar atualizar formulário com ID inválido', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Atualizar formulário')
                .story('ID inválido')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    idForm = (response.body.idFormulario)
                    formulario.formularioAtualizar(NaN, formBody)
                        .then((response) => {
                            expect(response.status).to.be.oneOf([500, 400])
                            formulario.formularioDelete(idForm)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                })
        });
    })

    context('Listar todos os formulários', () => {
        it('GET - Listar todos os formulários', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Listar todos os formulários')
                .story('Todas as queries corretas')

            formulario.formularioListarTodos(0, 10, 'idFormulario', 0)
                .then((response) => {
                    expect(response.status).to.eq(200)
                })
        });

        it('GET - Tentar listar todos os formulários passando qs inválida ', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Listar todos os formulários')
                .story('Queries inválidas')

            formulario.formularioListarTodos(NaN, NaN, 'idFormulario', NaN)
                .then((response) => {
                    expect(response.status).to.eq(200)
                })
        });

        it('GET - Tentar listar todos os formulários sem, passar queries', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Listar todos os formulários')
                .story('Queries vazias')

            formulario.formularioListarTodos()
                .then((response) => {
                    expect(response.status).to.eq(200)
                })
        });
    })

    context('Listar formulário individual', () => {
        it('GET - Deve listar um formulário individual', () => {
            cy.allure()
                .epic('Formulário')
                .feature('Listar formulário individual')
                .story('Todos os dados corretos')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    formulario.formularioListarIndividual(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            formulario.formularioDelete(response.body.idFormulario)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                })
        });
    })
})