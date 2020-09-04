/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/');
        cy.get('[data-test=email]').type('lucas-teste@email.com');
        cy.get('[data-test=passwd]').type('123456');
        cy.get('.btn').click();
        cy.get('.toast-message').should('contain', 'Bem vindo, Lucas Gomes!');
    });

    it('Should create an account', () => {
        cy.get('[data-test=menu-settings]').click();
        cy.get('[href="/contas"]').click();
        cy.get('[data-test=nome]').type('teste');
        cy.get('.btn').click();
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso!');
    });

    it.only()
});