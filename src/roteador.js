const Router = require('express');
const { listaDeContas, abrirConta, excluirConta, depositar, sacar, atualizarDadosCadastrais, transferencia, saldo, extrato } = require('./controladores/contas');
const verificarSenha = require('./intermediarios');
const rotas = Router();


rotas.get('/contas', verificarSenha, listaDeContas,);
rotas.post('/contas', abrirConta);
rotas.put('/contas/:numeroConta/usuario', atualizarDadosCadastrais);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.get('/contas/saldo', saldo);

rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferencia);
rotas.get('/contas/extrato', extrato),

    module.exports = rotas;