let { contas, depositos } = require('../bancodedados');

const depositarSaldo = async (req, res) => {
  const { numero_conta, valor } = req.body;
  const numeroContaFormatado = Number(numero_conta);

  if (valor <= 0) {
    return res.status(404).json({
      mensagem: 'Não é permitido depósito com valor negativo ou zerado',
    });
  }

  if (!numero_conta || !valor) {
    return res.status(404).json({
      mensagem:
        'Número da conta e o Valor são obrigatórios. Por favor, preencha e tente novamente!',
    });
  }

  const conta = contas.find((conta) => {
    return Number(conta.numero) === numeroContaFormatado;
  });

  if (!conta) {
    return res.status(404).json({ mensagem: 'Conta não encontrada' });
  }

  conta.saldo += valor;

  const data = new Date();
  const dataFormatada = data.toLocaleString();

  const deposito = {
    data: dataFormatada,
    numero_conta,
    valor,
  };

  depositos.push(deposito);

  return res.status(201).json({
    mensagem: 'Depósito realizado com sucesso',
  });
};

module.exports = depositarSaldo;
