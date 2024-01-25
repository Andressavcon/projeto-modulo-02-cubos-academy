let { contas, transferencias } = require('../bancodedados');

const transferirSaldo = async (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
  const numeroContaOrigemFormatado = Number(numero_conta_origem);
  const numeroContaDestinoFormatado = Number(numero_conta_destino);

  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res.status(404).json({
      mensagem:
        'Números da conta de origem e destino, o Valor e a Senha são obrigatórios. Por favor, preencha e tente novamente!',
    });
  }

  const contaOrigem = contas.find((conta) => {
    return Number(conta.numero) === numeroContaOrigemFormatado;
  });

  if (!contaOrigem) {
    return res.status(404).json({ mensagem: 'Conta não encontrada' });
  }

  const contaDestino = contas.find((conta) => {
    return Number(conta.numero) === numeroContaDestinoFormatado;
  });

  if (!contaDestino) {
    return res.status(404).json({ mensagem: 'Conta não encontrada' });
  }

  if (contaOrigem.usuario.senha !== senha) {
    return res.status(400).json({ mensagem: 'Senha inválida' });
  }

  if (valor > contaOrigem.saldo) {
    return res.status(400).json({
      mensagem:
        'Saldo insuficiente. Não é permitido transferência com valor superior ao saldo em conta',
    });
  }

  contaOrigem.saldo -= valor;
  contaDestino.saldo += valor;

  const data = new Date();
  const dataFormatada = data.toLocaleString();

  const transferencia = {
    data: dataFormatada,
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  transferencias.push(transferencia);

  return res.status(201).json({
    mensagem: 'Transferência realizado com sucesso',
  });
};

module.exports = transferirSaldo;
