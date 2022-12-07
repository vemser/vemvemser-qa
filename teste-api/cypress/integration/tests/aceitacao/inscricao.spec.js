import {
    faker
} from "@faker-js/faker";
import Avaliacao from "../../service/avaliacaoService";
import Candidato from "../../service/cadidatoService";
import Formulario from "../../service/formularioService";
import Inscricao from "../../service/inscricaoService";

const formBody = require('../../../fixtures/formulario.payload.json')
const avaliacao = new Avaliacao
const inscricao = new Inscricao
const candidato = new Candidato
const formulario = new Formulario

context('Inscrição', () => {
    context('Criar inscrição', () => {
        it('POST - Deve criar nova inscrição no banco de dados', () => {
            cy.allure()
                .epic('Inscrição')
                .feature('Criar uma nova inscrição')
                .story('Todos os dados corretos')

            //Cria um novo formulário
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
                                    // expect(response.status).to.eq(200)
                                    inscricao.buscarPorEmail(emailCandidato)
                                        .then((response) => {
                                            expect(response.status).to.eq(200);
                                            expect(response.body[0]).to.have.any.keys("candidato")
                                            expect(response.body[0]).to.have.any.keys("idInscricao")
                                            let idInscricao = response.body[0].idInscricao;
                                            inscricao.inscricaoDeletar(idInscricao)
                                                .then((response) => {
                                                    expect(response.status).to.eq(200)
                                                })
                                        })
                                })

                        })
                })
        })
        it('POST - Tentar criar inscrção sem candidato', () => {
            cy.allure()
                .epic('Inscrição')
                .feature('Criar uma nova inscrição')
                .story('Inscrição sem candidato')

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    //Cria candidato
                    candidato.candidatoCadastro(cNome, cData, cEmail, cTelefone, cRg, cCpf, cEstado, cCidade, cPcd, response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)

                            let idCandidato = response.body.idCandidato;
                            candidato.candidatoDeletar(idCandidato)
                            inscricao.inscricaoCriar(idCandidato)
                                .then((response) => {
                                    expect(response.status).to.eq(400)
                                })

                        })
                })

        });
    })
    context('Listar inscrições', () => {
        it('GET - Listar todas as inscrições', () => {
            cy.allure()
                .epic('Inscrição')
                .feature('Listar inscrições')
                .story('Nenhum dado necessário')

            inscricao.inscricaoListarTodas()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.elementos[0]).to.have.any.keys("candidato")
                    expect(response.body.elementos[0]).to.have.any.keys("idInscricao")
                })
        });
    })
    context('Listar inscrição por id', () => {
        it('GET - Listar inscrição Por ID', () => {
            cy.allure()
                .epic('Inscrição')
                .feature('Listar inscrições')
                .story('Todos os dados corretos')

            //Cria um novo formulário
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    //Cria candidato
                    candidato.candidatoCadastro(cNome, cData, cEmail, cTelefone, cRg, cCpf, cEstado, cCidade, cPcd, response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            let emailCandidato = response.body.email;
                            //Cria inscrição
                            inscricao.inscricaoCriar(response.body.idCandidato)
                                .then((response) => {
                                    // expect(response.status).to.eq(200)
                                    inscricao.buscarPorEmail(emailCandidato)
                                        .then((response) => {
                                            let idInscricao = response.body[0].idInscricao;
                                            inscricao.inscricaoListarPorId(idInscricao)
                                                .then((response) => {
                                                    expect(response.status).to.eq(200);
                                                    expect(response.body).to.have.any.keys("candidato")
                                                    expect(response.body).to.have.any.keys("idInscricao")
                                                    let idInscricao = response.body.idInscricao;
                                                    inscricao.inscricaoDeletar(idInscricao)
                                                        .then((response) => {
                                                            expect(response.status).to.eq(200)
                                                        })
                                                })
                                        })
                                })

                        })
                })
        });
        it('GET - Testar listar inscrição por ID inválido', () => {
            cy.allure()
                .epic('Inscrição')
                .feature('Listar inscrições')
                .story('Id inválido')

            inscricao.inscricaoListarPorId(NaN)
                .then((response) => {
                    expect(response.status).to.eq(400)
                })
        });
    })
    context('Listar por email', () => {
        it('GET - Listar por email', () => {
            cy.allure()
                .epic('Inscrição')
                .feature('Listar inscrições por email')
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
                                    // expect(response.status).to.eq(200)
                                    inscricao.buscarPorEmail(emailCandidato)
                                        .then((response) => {
                                            expect(response.status).to.eq(200);
                                            expect(response.body[0]).to.have.any.keys("candidato")
                                            expect(response.body[0]).to.have.any.keys("idInscricao")
                                            let idInscricao = response.body[0].idInscricao;
                                            inscricao.inscricaoDeletar(idInscricao)
                                                .then((response) => {
                                                    expect(response.status).to.eq(200)
                                                })
                                        })
                                })

                        })
                })
        });
        it('GET - Tentar buscar por email inexistente', () => {
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    //Cria candidato
                    candidato.candidatoCadastro(cNome, cData, cEmail, cTelefone, cRg, cCpf, cEstado, cCidade, cPcd, response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            let emailCandidato = response.body.email;
                            emailCandidato = "emailinvalido@dbccompany.com.br"
                            inscricao.inscricaoCriar(response.body.idCandidato)
                                .then((response) => {
                                    inscricao.buscarPorEmail(emailCandidato)
                                        .then((response) => {
                                            expect(response.status).to.be.oneOf([400, 200]);
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