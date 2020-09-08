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
                url: `/contas/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
                body: { nome: 'Conta alterada via rest' }
            }).as('response');
    
            cy.get('@response')
                .its('status').should('be.equal', 200);
        });
    });

    it('Should not create an account with same name', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            body: { nome: 'Conta mesmo nome' },
            failOnStatusCode: false
        }).as('response');
        
        cy.get('@response')
            .then(res => {
                console.log(res);
                expect(res.status).to.be.equal(400);
                expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!');
        });
    });

    it.only('Should create a transaction', () => {
        cy.request({
            method: 'POST',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}` },
            body: {
                conta_id: "41058",
                data_pagamento: "12/11/2019",
                data_transacao: "12/11/2019",
                descricao: "desc",
                envolvido: "inter",
                status: true,
                tipo: "REC",
                valor: "123"
            }
        });
    });

    it('Should get balance', () => {
    });

    it('Should remove a transaction', () => {
    });
});