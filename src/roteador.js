const Router = require('express');
const verificarSenha = require('./intermediarios');
const { listaDeContas, abrirConta, excluirConta, depositar, sacar, atualizarDadosCadastrais, transferencia, saldo } = require('./controladores/contas');
const rotas = Router();

rotas.use(verificarSenha);

rotas.get('/contas', listaDeContas);
rotas.post('/contas', abrirConta);
rotas.put('/contas/:numeroConta/usuario', atualizarDadosCadastrais);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.get('/contas/saldo', saldo);

rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferencia);


module.exports = rotas;