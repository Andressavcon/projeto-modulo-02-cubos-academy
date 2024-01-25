let { contas } = require('../bancodedados');

let id = 1;

const criarConta = async (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({
      mensagem:
        'Verifique os campos pois um item obrigatório está faltando! (Nome, CPF, Data de Nascimento, Telefone, Email e Senha são obrigatórios)',
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

  const novaConta = {
    numero: id++,
    saldo: 0,
    usuario: {
      nome,
      email,
      cpf,
      data_nascimento,
      telefone,
      senha,
    },
  };

  contas.push(novaConta);

  return res.status(201).json(novaConta);
};

module.exports = criarConta;
