let { contas, saques } = require('../bancodedados');

const sacarSaldo = async (req, res) => {
  const { numero_conta, valor, senha } = req.body;
  const numeroContaFormatado = Number(numero_conta);

  if (!numero_conta || !valor || !senha) {
    return res.status(404).json({
      mensagem:
        'Número da conta, o Valor e a Senha são obrigatórios. Por favor, preencha e tente novamente!',
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

  if (valor > conta.saldo) {
    return res.status(400).json({
      mensagem:
        'Saldo insuficiente. Não é permitido saque com valor superior ao saldo em conta',
    });
  }

  conta.saldo -= valor;

  const data = new Date();
  const dataFormatada = data.toLocaleString();

  const saque = {
    data: dataFormatada,
    numero_conta,
    valor,
  };

  saques.push(saque);

  return res.status(201).json({
    mensagem: 'Saque realizado com sucesso',
  });
};

module.exports = sacarSaldo;
