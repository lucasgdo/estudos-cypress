/// <reference types="cypress" />

import loc from '../../support/locators';
import '../../support/commandsContas';

describe('Should test at a functional level', () => {
    let token;

    before(() => {
        cy.getToken('lucas-teste@email.com', '123456')
            .then(tkn => {
                token = tkn;
            });
    });

    beforeEach(() => {
        cy.resetRest();
    });

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            body: { nome: 'Conta via rest' }
        }).as('response');
        
        cy.get('@response')
            .then(res => {
                expect(res.status).to.be.equal(201);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('nome', 'Conta via rest');
        });
    });

    it('Should update an account', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: 'https://barrigareact.wcaquino.me/contas/40938',
                headers: { Authorization: `JWT ${token}` },
                body: { nome: 'Conta alterada via rest' }
            }).as('response');
    
            cy.get('@response')
                .its('status').should('be.equal', 200);
        });
    });

    it('Should not create an account with same name', () => {
    });

    it('Should create a transaction', () => {
    });

    it('Should get balance', () => {
    });

    it('Should remove a transaction', () => {
    });
});