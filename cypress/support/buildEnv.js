const buildEnv = () => {
    cy.server();
    cy.route({
        method: 'POST',
        url: '/signin',
        response: { id: 1000, nome: 'Usuário falso', token: 'Uma string muito grande' }
    }).as('signin');

    cy.route({
       method: 'GET',
       url: '/saldo',
       response: [
            { conta_id: 999, conta: 'Carteira', saldo: '100.00' },
            { conta_id: 9909, conta: 'Banco', saldo: '10000000000.00'}
        ]
    }).as('saldo');

    cy.route({
        method: 'GET',
        url: '/contas',
        response: [
            { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
            { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 }
        ]
    }).as('contas');

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            { conta: 'Conta para movimentacoes', id: 31434, descricao: 'Movimentacao 1, calculo saldo', envolvido: 'AAA', observacao: null, tipo: 'DESP', data_transacao: '2020-09-09T03:00:00:000Z', data_pagamento: '2020-09-09T03:00:00:000Z', valor: '-1500.00', status: true, conta_id: 42077, usuario_id: 1, transferencia_id: null, parcelamento_id: null},
            { conta: 'Conta com movimentacao', id: 31434, descricao: 'Movimentacao 2', envolvido: 'AAA', observacao: null, tipo: 'DESP', data_transacao: '2020-09-09T03:00:00:000Z', data_pagamento: '2020-09-09T03:00:00:000Z', valor: '-1500.00', status: true, conta_id: 42077, usuario_id: 1, transferencia_id: null, parcelamento_id: null },
            { conta: 'Conta para saldo', id: 31434, descricao: 'Movimentacao 3', envolvido: 'AAA', observacao: null, tipo: 'DESP', data_transacao: '2020-09-09T03:00:00:000Z', data_pagamento: '2020-09-09T03:00:00:000Z', valor: '-1500.00', status: true, conta_id: 42077, usuario_id: 1, transferencia_id: null, parcelamento_id: null },
            { conta: 'Conta para saldo', id: 31434, descricao: 'Movimentacao 4', envolvido: 'AAA', observacao: null, tipo: 'DESP', data_transacao: '2020-09-09T03:00:00:000Z', data_pagamento: '2020-09-09T03:00:00:000Z', valor: '-1500.00', status: true, conta_id: 42077, usuario_id: 1, transferencia_id: null, parcelamento_id: null },
            { conta: 'Conta para saldo', id: 31434, descricao: 'Movimentacao 5', envolvido: 'AAA', observacao: null, tipo: 'DESP', data_transacao: '2020-09-09T03:00:00:000Z', data_pagamento: '2020-09-09T03:00:00:000Z', valor: '-1500.00', status: true, conta_id: 42077, usuario_id: 1, transferencia_id: null, parcelamento_id: null },
            { conta: 'Conta para extrato', id: 31434, descricao: 'Movimentacao para exclusao', envolvido: 'AAA', observacao: null, tipo: 'DESP', data_transacao: '2020-09-09T03:00:00:000Z', data_pagamento: '2020-09-09T03:00:00:000Z', valor: '-1500.00', status: true, conta_id: 42077, usuario_id: 1, transferencia_id: null, parcelamento_id: null }
        ]
    });
};

export default buildEnv;