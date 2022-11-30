import {
    faker
} from "@faker-js/faker";
import Candidato from "../../service/cadidatoService";
import Formulario from "../../service/formularioService";

const candidato = new Candidato
const formulario = new Formulario
const formBody = require('../../../fixtures/formulario.payload.json')

context('Candidado', () => {
    context('Listar candidatos', () => {
        it('GET - Deve listar todos os candidatos do banco de dados ', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Lista todos os candidatos no banco de dados')
                .story('Nenhum dado necessário')
            candidato.candidatoListar()
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body[0]).to.have.property('nome');
                    expect(response.body[0]).to.have.property('idCandidato');
                    expect(response.body[0]).to.have.property('email');
                })
        });
    })

    context('Criar candidato', () => {
        it('POST - Deve criar um novo candidato', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Adicionar um candidato no banco de dados')
                .story('Todos os dados corretos');


            let nome = faker.name.firstName();
            let genero = 'Masculino';
            let email = faker.internet.email();
            let telefone = faker.random.numeric(9);
            let rg = faker.random.numeric(9);
            let cpf = candidato.gerarCPF();
            let estado = 'BA';
            let cidade = faker.address.cityName();
            let idFormulario;
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    idFormulario = response.body.idFormulario
                    candidato.candidatoCadastro(nome, genero, email, telefone, rg, cpf, estado, cidade, idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            expect(response.body.nome).to.eq(nome)
                            candidato.candidatoDeletar(response.body.idCandidato)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                    formulario.formularioDelete(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                })
        });

        it('POST - Testar criar candidato com campos vazios', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Adicionar um candidato no banco de dados')
                .story('Todos os campos vazios');

            candidato.candidatoCadastro('', '', '', '', '', '', '', '', '', )
                .then((response) => {
                    expect(response.status).to.eq(400)
                })
        });

        it('POST - Testar criar candidato sem RG', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Adicionar um candidato no banco de dados')
                .story('Sem preencher RG');

            let nome = faker.name.firstName();
            let genero = 'Masculino';
            let email = faker.internet.email();
            let telefone = faker.random.numeric(9);
            let rg = faker.random.numeric(9);
            let cpf = candidato.gerarCPF();
            let estado = 'BA';
            let cidade = faker.address.cityName();
            let idFormulario;
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    idFormulario = response.body.idFormulario
                    candidato.candidatoCadastro(nome, genero, email, telefone, cpf, estado, cidade, idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(400)
                            candidato.candidatoDeletar(response.body.idCandidato)
                                .then((response) => {
                                    expect(response.status).to.eq(400)
                                })
                        })
                    formulario.formularioDelete(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                })
        });

        it('POST - Testar criar candidato com CPF inválido', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Adicionar um candidato no banco de dados')
                .story('Com CPF inválido');

            let nome = faker.name.firstName();
            let genero = 'Masculino';
            let email = faker.internet.email();
            let telefone = faker.random.numeric(9);
            let rg = faker.random.numeric(9);
            let cpf = "747-474-747-47";
            let estado = 'BA';
            let cidade = faker.address.cityName();
            let idFormulario;

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    idFormulario = response.body.idFormulario
                    candidato.candidatoCadastro(nome, genero, email, telefone, rg, cpf, estado, cidade, idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(400)
                            expect(response.body.errors).to.contain("cpf: invalid Brazilian individual taxpayer registry number (CPF)")
                        })
                    formulario.formularioDelete(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                })
        });

        it('POST - Testar criar candidato nome menor que 3 caracteres', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Adicionar um candidato no banco de dados')
                .story('Nome menor que 3 caracteres');

            let nome = 'Al';
            let genero = 'Masculino';
            let email = faker.internet.email();
            let telefone = faker.random.numeric(9);
            let rg = faker.random.numeric(9);
            let cpf = candidato.gerarCPF();
            let estado = 'BA';
            let cidade = faker.address.cityName();
            let idFormulario;

            formulario.formularioCadastro(formBody)
                .then((response) => {
                    idFormulario = response.body.idFormulario
                    candidato.candidatoCadastro(nome, genero, email, telefone, rg, cpf, estado, cidade, idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(400)
                            expect(response.body.errors).to.contain("nome: O nome deve ter de 3 a 255 caracteres")
                        })
                    formulario.formularioDelete(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                })
        });
    })

    context('Deletar usuário', () => {
        it('DELETE - Deve deletar um usuário', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Deletar um candidato do banco de dados')
                .story('Todos os dados corretos');

            let nome = faker.name.firstName();
            let genero = 'Masculino';
            let email = faker.internet.email();
            let telefone = faker.random.numeric(9);
            let rg = faker.random.numeric(9);
            let cpf = candidato.gerarCPF();
            let estado = 'BA';
            let cidade = faker.address.cityName();
            let idFormulario;
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    idFormulario = response.body.idFormulario
                    candidato.candidatoCadastro(nome, genero, email, telefone, rg, cpf, estado, cidade, idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            expect(response.body.nome).to.eq(nome)
                            candidato.candidatoDeletar(response.body.idCandidato)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                    formulario.formularioDelete(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                })
        });

        it('DELETE - Testar deletar usuário sem passar ID', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Deletar um candidato do banco de dados')
                .story('Sem preencher ID');

            candidato.candidatoDeletar()
                .then((response) => {
                    expect(response.status).to.eq(400)
                })
        });

        it('DELETE - Testar deletar usuário com ID inexistente', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Deletar um candidato do banco de dados')
                .story('Com ID inexistente');

            candidato.candidatoDeletar(0)
                .then((response) => {
                    expect(response.status).to.eq(400)
                })
        });

        it('DELETE - Testar deletar usuário com ID inválido', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Deletar um candidato do banco de dados')
                .story('Com ID inválido');

            candidato.candidatoDeletar(NaN)
                .then((response) => {
                    expect(response.status).to.eq(400)
                })
        });
    })

    context('Atualizar candidato', () => {
        it('PUT - Atualizar um candidato', () => {

            cy.allure()
                .epic('Candidato')
                .feature('Atualizar um candidato no banco de dados')
                .story('Todos os dados corretos');

            let nome = faker.name.firstName();
            let genero = 'Masculino';
            let email = faker.internet.email();
            let telefone = faker.random.numeric(9);
            let rg = faker.random.numeric(9);
            let cpf = candidato.gerarCPF();
            let estado = 'BA';
            let cidade = faker.address.cityName();
            let idFormulario;
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    idFormulario = response.body.idFormulario
                    candidato.candidatoCadastro(nome, genero, email, telefone, rg, cpf, estado, cidade, idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            expect(response.body.nome).to.eq(nome)
                            candidato.candidatoAtualizar(response.body.idCandidato,
                                    faker.name.firstName(),
                                    'Feminino',
                                    faker.internet.email(),
                                    faker.random.numeric(9),
                                    faker.random.numeric(9),
                                    candidato.gerarCPF(),
                                    'MA',
                                    faker.address.cityName(),
                                    474
                                )
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                    expect(response.body.estado).to.eq('MA')
                                })
                            candidato.candidatoDeletar(response.body.idCandidato)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                    formulario.formularioDelete(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                })
        });

        it('PUT - Testar atualizar um candidato com dados vazios', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Atualizar um candidato no banco de dados')
                .story('Todos os dados vazios');

            let nome = faker.name.firstName();
            let genero = 'Masculino';
            let email = faker.internet.email();
            let telefone = faker.random.numeric(9);
            let rg = faker.random.numeric(9);
            let cpf = candidato.gerarCPF();
            let estado = 'BA';
            let cidade = faker.address.cityName();
            let idFormulario;
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    idFormulario = response.body.idFormulario
                    candidato.candidatoCadastro(nome, genero, email, telefone, rg, cpf, estado, cidade, idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            expect(response.body.nome).to.eq(nome)
                            candidato.candidatoAtualizar(response.body.idCandidato)
                                .then((response) => {
                                    expect(response.status).to.eq(400)
                                })
                            candidato.candidatoDeletar(response.body.idCandidato)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                    formulario.formularioDelete(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                })
        });

        it('PUT - Testar atualizar candidato preechendo ID inexistente', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Atualizar um candidato no banco de dados')
                .story('ID inexistente');

            let nome = faker.name.firstName();
            let genero = 'Masculino';
            let email = faker.internet.email();
            let telefone = faker.random.numeric(9);
            let rg = faker.random.numeric(9);
            let cpf = candidato.gerarCPF();
            let estado = 'BA';
            let cidade = faker.address.cityName();
            let idFormulario;
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    idFormulario = response.body.idFormulario
                    candidato.candidatoCadastro(nome, genero, email, telefone, rg, cpf, estado, cidade, idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            expect(response.body.nome).to.eq(nome)
                            candidato.candidatoAtualizar(0,
                                    faker.name.firstName(),
                                    'Feminino',
                                    faker.internet.email(),
                                    faker.random.numeric(9),
                                    faker.random.numeric(9),
                                    candidato.gerarCPF(),
                                    'MA',
                                    faker.address.cityName(),
                                    474
                                )
                                .then((response) => {
                                    expect(response.status).to.be.oneOf([404, 400, 500])
                                })
                            candidato.candidatoDeletar(response.body.idCandidato)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                    formulario.formularioDelete(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                })
        });

        it('PUT - Testar atualizar um candidato com nome inválido', () => {
            cy.allure()
                .epic('Candidato')
                .feature('Atualizar um candidato no banco de dados')
                .story('Preechendo nome inválido');

            let nome = faker.name.firstName();
            let genero = 'Masculino';
            let email = faker.internet.email();
            let telefone = faker.random.numeric(9);
            let rg = faker.random.numeric(9);
            let cpf = candidato.gerarCPF();
            let estado = 'BA';
            let cidade = faker.address.cityName();
            let idFormulario;
            formulario.formularioCadastro(formBody)
                .then((response) => {
                    idFormulario = response.body.idFormulario
                    candidato.candidatoCadastro(nome, genero, email, telefone, rg, cpf, estado, cidade, idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                            expect(response.body.nome).to.eq(nome)
                            candidato.candidatoAtualizar(response.body.idCandidato,
                                    'Al',
                                    'Feminino',
                                    faker.internet.email(),
                                    faker.random.numeric(9),
                                    faker.random.numeric(9),
                                    candidato.gerarCPF(),
                                    'MA',
                                    faker.address.cityName(),
                                    474
                                )
                                .then((response) => {
                                    expect(response.status).to.be.oneOf([400, 500])
                                })
                            candidato.candidatoDeletar(response.body.idCandidato)
                                .then((response) => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                    formulario.formularioDelete(response.body.idFormulario)
                        .then((response) => {
                            expect(response.status).to.eq(200)
                        })
                })
        });
    })
})