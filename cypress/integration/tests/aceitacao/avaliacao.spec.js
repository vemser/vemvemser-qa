import {
    faker
} from "@faker-js/faker";
import Avaliacao from "../../service/avaliacaoService";
import Candidato from "../../service/cadidatoService";
import Formulario from "../../service/formularioService";
import Inscricao from "../../service/inscricaoService";

const candidatoPayload = require('../../../fixtures/candidato.payload.json')
const formBody = require('../../../fixtures/formulario.payload.json')
const avaliacao = new Avaliacao
const inscricao = new Inscricao
const candidato = new Candidato
const formulario = new Formulario

context('Avaliação', () => {
    context('Criar Avaliação', () => {
        it('POST - Deve criar nova avaliação no banco de dados', () => {
            cy.allure()
                .epic('Avaliação')
                .feature('Criar uma nova avaliação')
                .story('Todos os dados corretos')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    //Cria candidato
                    candidato.candidatoCadastro(cNome, cData, cEmail, cTelefone, cRg, cCpf, cEstado, cCidade, cPcd, response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            let emailCandidato = response.body.email;
                            inscricao.inscricaoCriar(response.body.idCandidato)
                                .then((response) => {

                                    inscricao.buscarPorEmail(emailCandidato)
                                        .then((response) => {
                                            expect(response.status).to.eq(200);
                                            expect(response.body[0]).to.have.any.keys("candidato")
                                            expect(response.body[0]).to.have.any.keys("idInscricao")
                                            let idInscricao = response.body[0].idInscricao;
                                            avaliacao.avaliacaoCadastro(true, idInscricao)
                                                .then((response) => {


                                                    avaliacao.listarPorEmail(emailCandidato)
                                                        .then((response) => {
                                                            expect(response.status).to.eq(200)
                                                            expect(response.body[0]).to.have.any.keys("avaliador")
                                                            avaliacao.avaliacaoDeletar(response.body[0].idAvaliacao)
                                                                .then((response) => {
                                                                    expect(response.status).to.eq(200)
                                                                })
                                                        })
                                                })

                                        })
                                })

                        })
                })
        });
    })
    context('Deletar avaliação', () => {

        it('DELETE - Deve deletar uma avaliação', () => {
            cy.allure()
                .epic('Avaliação')
                .feature('Deletar avaliação')
                .story('Todos os dados corretos')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    //Cria candidato
                    candidato.candidatoCadastro(cNome, cData, cEmail, cTelefone, cRg, cCpf, cEstado, cCidade, cPcd, response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            let emailCandidato = response.body.email;
                            inscricao.inscricaoCriar(response.body.idCandidato)
                                .then((response) => {

                                    inscricao.buscarPorEmail(emailCandidato)
                                        .then((response) => {
                                            expect(response.status).to.eq(200);
                                            expect(response.body[0]).to.have.any.keys("candidato")
                                            expect(response.body[0]).to.have.any.keys("idInscricao")
                                            let idInscricao = response.body[0].idInscricao;
                                            avaliacao.avaliacaoCadastro(true, idInscricao)
                                                .then((response) => {


                                                    avaliacao.listarPorEmail(emailCandidato)
                                                        .then((response) => {
                                                            expect(response.status).to.eq(200)
                                                            expect(response.body[0]).to.have.any.keys("avaliador")
                                                            avaliacao.avaliacaoDeletar(response.body[0].idAvaliacao)
                                                                .then((response) => {
                                                                    expect(response.status).to.eq(200)
                                                                })
                                                        })
                                                })

                                        })
                                })

                        })
                })
        });
        it('DELETE - Testar deletar avliação com ID incorreto', () => {
            cy.allure()
                .epic('Avaliação')
                .feature('Listar avaliação')
                .story('ID incorreto')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    //Cria candidato
                    candidato.candidatoCadastro(cNome, cData, cEmail, cTelefone, cRg, cCpf, cEstado, cCidade, cPcd, response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            let emailCandidato = response.body.email;
                            inscricao.inscricaoCriar(response.body.idCandidato)
                                .then((response) => {

                                    inscricao.buscarPorEmail(emailCandidato)
                                        .then((response) => {
                                            expect(response.status).to.eq(200);
                                            expect(response.body[0]).to.have.any.keys("candidato")
                                            expect(response.body[0]).to.have.any.keys("idInscricao")
                                            let idInscricao = response.body[0].idInscricao;
                                            avaliacao.avaliacaoCadastro(true, idInscricao)
                                                .then((response) => {


                                                    avaliacao.listarPorEmail(emailCandidato)
                                                        .then((response) => {
                                                            expect(response.status).to.eq(200)
                                                            expect(response.body[0]).to.have.any.keys("avaliador")
                                                            let idAvaliacao = response.body[0].idAvaliacao
                                                            avaliacao.avaliacaoDeletar(response.body[0].idAvaliacao)
                                                                .then((response) => {
                                                                    expect(response.status).to.eq(200)
                                                                    avaliacao.avaliacaoDeletar(idAvaliacao)
                                                                        .then((response) => {
                                                                            expect(response.status).to.eq(400)
                                                                        })
                                                                })
                                                        })
                                                })

                                        })
                                })

                        })
                })
        });
    })
    context('Listar avaliação', () => {
        it('GET - Listar todas as avaliações', () => {
            cy.allure()
                .epic('Avaliação')
                .feature('Listar avaliações')
                .story('Nenhum dado necessário')

            avaliacao.avaliacaoListar()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.elementos[0]).to.have.any.keys("idAvaliacao")
                })
        });
    })

    context('Listar avaliação por email', () => {
        it('GET - Listar avaliação por email', () => {
            cy.allure()
                .epic('Avaliação')
                .feature('Listar avaliação')
                .story('email corretor')
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    //Cria candidato
                    candidato.candidatoCadastro(cNome, cData, cEmail, cTelefone, cRg, cCpf, cEstado, cCidade, cPcd, response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            let emailCandidato = response.body.email;
                            inscricao.inscricaoCriar(response.body.idCandidato)
                                .then((response) => {

                                    inscricao.buscarPorEmail(emailCandidato)
                                        .then((response) => {
                                            expect(response.status).to.eq(200);
                                            expect(response.body[0]).to.have.any.keys("candidato")
                                            expect(response.body[0]).to.have.any.keys("idInscricao")
                                            let idInscricao = response.body[0].idInscricao;
                                            avaliacao.avaliacaoCadastro(true, idInscricao)
                                                .then((response) => {


                                                    avaliacao.listarPorEmail(emailCandidato)
                                                        .then((response) => {
                                                            expect(response.status).to.eq(200)
                                                            expect(response.body[0]).to.have.any.keys("avaliador")
                                                            avaliacao.avaliacaoDeletar(response.body[0].idAvaliacao)
                                                                .then((response) => {
                                                                    expect(response.status).to.eq(200)
                                                                })
                                                        })
                                                })

                                        })
                                })

                        })
                })
        });
    })

    context('Atualizar avaliação', () => {
        it('PUT - Deve atualizar uma avaliação', () => {
            cy.allure()
                .epic('Avaliação')
                .feature('Atualizar avaliação')
                .story('Todos os dados corretos')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    //Cria candidato
                    candidato.candidatoCadastro(cNome, cData, cEmail, cTelefone, cRg, cCpf, cEstado, cCidade, cPcd, response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            let emailCandidato = response.body.email;
                            inscricao.inscricaoCriar(response.body.idCandidato)
                                .then((response) => {
                                    inscricao.buscarPorEmail(emailCandidato)
                                        .then((response) => {
                                            expect(response.status).to.eq(200);
                                            expect(response.body[0]).to.have.any.keys("candidato")
                                            expect(response.body[0]).to.have.any.keys("idInscricao")
                                            let idInscricao = response.body[0].idInscricao;
                                            avaliacao.avaliacaoCadastro(true, idInscricao)
                                                .then((response) => {
                                                    avaliacao.listarPorEmail(emailCandidato)
                                                        .then((response) => {
                                                            expect(response.status).to.eq(200)
                                                            expect(response.body[0]).to.have.any.keys("avaliador")
                                                            avaliacao.avaliacaoAtualizar(response.body[0].idAvaliacao, true)
                                                                .then((response) => {
                                                                    expect(response.status).to.eq(200)
                                                                    expect(response.body).to.have.any.keys("idAvaliacao")
                                                                })
                                                            avaliacao.avaliacaoDeletar(response.body[0].idAvaliacao)
                                                                .then((response) => {
                                                                    expect(response.status).to.eq(200)
                                                                })
                                                        })
                                                })

                                        })
                                })

                        })
                })

        });

        it('PUT - Testar atualizar avaliação passando ID inexistente', () => {
            cy.allure()
                .epic('Avaliação')
                .feature('Atualizar avaliação')
                .story('Todos os dados corretos')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    //Cria candidato
                    candidato.candidatoCadastro(cNome, cData, cEmail, cTelefone, cRg, cCpf, cEstado, cCidade, cPcd, response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            let emailCandidato = response.body.email;
                            inscricao.inscricaoCriar(response.body.idCandidato)
                                .then((response) => {
                                    inscricao.buscarPorEmail(emailCandidato)
                                        .then((response) => {
                                            expect(response.status).to.eq(200);
                                            expect(response.body[0]).to.have.any.keys("candidato")
                                            expect(response.body[0]).to.have.any.keys("idInscricao")
                                            let idInscricao = response.body[0].idInscricao;
                                            avaliacao.avaliacaoCadastro(true, idInscricao)
                                                .then((response) => {
                                                    avaliacao.listarPorEmail(emailCandidato)
                                                        .then((response) => {
                                                            expect(response.status).to.eq(200)
                                                            expect(response.body[0]).to.have.any.keys("avaliador")
                                                            avaliacao.avaliacaoDeletar(response.body[0].idAvaliacao)
                                                                .then((response) => {
                                                                    expect(response.status).to.eq(200)
                                                                })
                                                            avaliacao.avaliacaoAtualizar(response.body[0].idAvaliacao, true)
                                                                .then((response) => {
                                                                    expect(response.status).to.eq(400)
                                                                })
                                                        })
                                                })

                                        })
                                })

                        })
                })
        });
    })
})


let cNome = faker.name.firstName();
let cData = '1978-10-10';
let cEmail = `${faker.name.firstName()}@dbccompany.com.br`
let cTelefone = faker.random.numeric(9);
let cRg = faker.random.numeric(9);
let cCpf = candidato.gerarCPF();
let cEstado = "RS";
let cCidade = "Porto Alegre";
let cPcd = false;