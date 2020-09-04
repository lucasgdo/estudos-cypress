/// <reference types="cypress" />

describe('Challenge', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    it('Click Confirmar', () => {
        cy.get('#formCadastrar').click();
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Nome eh obrigatorio');
        });
    });

    it('Preencher Nome', () => {
        cy.get('#formNome').type('Lucas');
    });

    it('Click Confirmar 2', () => {
        cy.get('#formCadastrar').click();
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Sobrenome eh obrigatorio');
        });
    });

    it('Preencher Sobrenome', () => {
        cy.get('[data-cy=dataSobrenome]').type('Gomes');
    });

    it('Click Confirmar 3', () => {
        cy.get('#formCadastrar').click();
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Sexo eh obrigatorio');
        });
    });

    it('Marcar Sexo', () => {
        cy.get('#formSexoMasc').click();
    })

    it('Click Confirmar 4', () => {
        cy.get('#formCadastrar').click();
        cy.get('#resultado > :nth-child(1)')
            .should('contain', 'Cadastrado!');
    });
});

