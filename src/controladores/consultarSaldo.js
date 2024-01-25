const { contas } = require('../bancodedados');

const consultarSaldo = async (req, res) => {
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

  const saldoConta = {
    saldo: conta.saldo,
  };

  return res.status(200).json(saldoConta);
};

module.exports = consultarSaldo;
