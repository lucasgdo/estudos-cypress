/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(() => {
        cy.reload();
    });

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano'];
    foods.forEach(food => {
        it(`Cadastro com comida variada: ${food}`, () => {
            cy.fixture('userData').as('usuario').then(function () {
                cy.get('#formNome').type(this.usuario.nome);
                cy.get('#formSobrenome').type(this.usuario.sobrenome);
                cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click();

                cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click();

                cy.get('#formEscolaridade').select(this.usuario.escolaridade);
                cy.get('#formEsportes').select(this.usuario.esportes);
                cy.get('#formCadastrar').click();
                cy.get('#resultado > :nth-child(1)')
                    .should('contain', 'Cadastrado!');
            });
        });
    });

    it.only('deve selecionar todos usando o each', () => {
        cy.fixture('userData').as('usuario').then(function () {
            cy.get('#formNome').type(this.usuario.nome);
            cy.get('#formSobrenome').type(this.usuario.sobrenome);
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click();

            cy.get('[name=formComidaFavorita]').each($el => {
                if($el.val() !== 'vegetariano')
                    cy.wrap($el).click();
            });

            cy.get('#formEscolaridade').select(this.usuario.escolaridade);
            cy.get('#formEsportes').select(this.usuario.esportes);
            cy.get('#formCadastrar').click();
            cy.get('#resultado > :nth-child(1)')
                .should('contain', 'Cadastrado!');
            // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?');
        });
    })
});