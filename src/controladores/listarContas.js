const { contas, banco } = require('../bancodedados');

const listarContas = async (req, res) => {
  const { senha_banco } = req.query;

  if (!senha_banco) {
    return res.status(400).json('Por favor, insira a senha!');
  }
  
  if (senha_banco !== banco.senha) {
    return res.status(400).json('Senha incorreta.');
  }

  return res.status(200).json(contas);
};

module.exports = listarContas;
