const UserController = require('../controller/user');

class UserView {
  // Recebe a requisição HTTP de cadastro e devolve o JSON do usuário criado
  async create(req, res) {
    try {
      // Aceita tanto 'nome', 'name' ou 'nomeCompleto' vindos do frontend
      const nome = req.body.nome || req.body.name || req.body.nomeCompleto;
      const email = req.body.email;
      // Aceita tanto 'senha' quanto 'password'
      const senha = req.body.senha || req.body.password;

      const user = await UserController.create(nome, email, senha);
      res.status(201).json({ id: user.id, nome: user.nome, email: user.email });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  }

  // Recebe a tentativa de login e responde com os dados do perfil e o Token gerado
  async login(req, res) {
    try {
      const email = req.body.email;
      // Aceita tanto 'senha' quanto 'password' vindo do formulário de login
      const senha = req.body.senha || req.body.password;

      const result = await UserController.login(email, senha);
      res.status(200).json(result);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  }
}

module.exports = new UserView();
