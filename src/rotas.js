const express = require('express');
const listarContas = require('./controladores/listarContas');
const criarConta = require('./controladores/criarConta');
const atualizarConta = require('./controladores/atualizarConta');
const deletarConta = require('./controladores/deletarConta');
const depositarSaldo = require('./controladores/depositarSaldo');
const sacarSaldo = require('./controladores/sacarSaldo');
const transferirSaldo = require('./controladores/transferirSaldo');
const consultarSaldo = require('./controladores/consultarSaldo');
const consultarExtrato = require('./controladores/extratoSaldo');

const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarConta);
rotas.delete('/contas/:numeroConta', deletarConta);

rotas.post('/transacoes/depositar', depositarSaldo);
rotas.post('/transacoes/sacar', sacarSaldo);
rotas.post('/transacoes/transferir', transferirSaldo);

rotas.get('/contas/saldo', consultarSaldo);
rotas.get('/contas/extrato', consultarExtrato);

module.exports = rotas;
