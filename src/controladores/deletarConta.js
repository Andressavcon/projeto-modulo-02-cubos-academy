let { contas } = require('../bancodedados');

const deletarConta = async (req, res) => {
  const { numeroConta } = req.params;
  const numeroContaFormatado = Number(numeroConta);

  const contaExiste = contas.findIndex((conta) => {
    return Number(conta.numero) === numeroContaFormatado;
  });

  if (contaExiste < 0) {
    return res.status(404).json({ mensagem: 'Conta não encontrada' });
  }

  if (contas[contaExiste].saldo !== 0) {
    return res.status(400).json({
      mensagem:
        'Não é possivel excluir conta bancária que possua saldo em conta',
    });
  }

  contas.splice(contaExiste, 1);

  return res.status(200).json({
    mensagem: 'Conta excluída com sucesso',
  });
};

module.exports = deletarConta;
