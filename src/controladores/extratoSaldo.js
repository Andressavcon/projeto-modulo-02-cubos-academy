let { contas, saques, depositos, transferencias } = require('../bancodedados');

const consultarExtrato = async (req, res) => {
  const { numero_conta, senha } = req.query;
  const numeroContaFormatado = Number(numero_conta);

  if (!numero_conta || !senha) {
    return res.status(404).json({
      mensagem:
        'Número da conta e a Senha são obrigatórios. Por favor, preencha e tente novamente!',
    });
  }

  const conta = contas.find((conta) => {
    return Number(conta.numero) === numeroContaFormatado;
  });

  if (!conta) {
    return res.status(404).json({ mensagem: 'Conta não encontrada' });
  }

  if (conta.usuario.senha !== senha) {
    return res.status(400).json({ mensagem: 'Senha inválida' });
  }

  const depositosDaConta = depositos.filter((deposito) => {
    return Number(deposito.numero_conta) === numeroContaFormatado;
  });

  const saquesDaConta = saques.filter((saque) => {
    return Number(saque.numero_conta) === numeroContaFormatado;
  });

  const transferenciasEnviadas = transferencias.filter((transferencia) => {
    return Number(transferencia.numero_conta_origem) === numeroContaFormatado;
  });

  const transferenciasRecebidas = transferencias.filter((transferencia) => {
    return Number(transferencia.numero_conta_destino) === numeroContaFormatado;
  });

  const extrato = {
    depositos: depositosDaConta,
    saques: saquesDaConta,
    transferenciasEnviadas,
    transferenciasRecebidas,
  };

  return res.status(200).json(extrato);
};

module.exports = consultarExtrato;
