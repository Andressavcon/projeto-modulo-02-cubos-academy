let { contas } = require('../bancodedados');

const atualizarConta = async (req, res) => {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const numeroContaFormatado = Number(numeroConta);

  const conta = contas.find((conta) => conta.numero === numeroContaFormatado);

  if (!conta) {
    return res.status(404).json({ mensagem: 'Conta não encontrada' });
  }

  if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
    return res.status(404).json({
      mensagem:
        'Nenhum dado para ser alterado foi enviado! Por favor verifique e tente novamente.',
    });
  }

  const verificaCPF = contas.find((conta) => conta.usuario.cpf === cpf);
  if (verificaCPF) {
    return res.status(400).json({ mensagem: 'CPF ja cadastrado' });
  }
  const verificaEmail = contas.find((conta) => conta.usuario.email === email);
  if (verificaEmail) {
    return res.status(400).json({ mensagem: 'Email ja cadastrado' });
  }

  if (nome) conta.usuario.nome = nome;
  if (cpf) conta.usuario.cpf = cpf;
  if (data_nascimento) conta.usuario.data_nascimento = data_nascimento;
  if (telefone) conta.usuario.telefone = telefone;
  if (email) conta.usuario.email = email;
  if (senha) conta.usuario.senha = senha;

  return res.status(201).json({
    mensagem: 'Conta atualizada com sucesso',
  });
};

module.exports = atualizarConta;
