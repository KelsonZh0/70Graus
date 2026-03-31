const BASE_URL = 'http://10.0.2.2:8080';

export interface FuncionarioProps {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

export const FuncionarioService = {

  // Cadastro: Manda o POST pro Java criar o funcionário no banco
  cadastrar: async (funcionario: Omit<FuncionarioProps, 'id'>): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/funcionario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funcionario),
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      return false;
    }
  },

  // Login: Busca todos os funcionários e verifica se o nome+senha batem
  login: async (nome: string, senha: string): Promise<FuncionarioProps | null> => {
    try {
      const response = await fetch(`${BASE_URL}/funcionario`);
      if (!response.ok) return null;

      const todos: FuncionarioProps[] = await response.json();

      // Procura alguém que bata nome E senha
      const encontrado = todos.find(
        (f) => f.nome === nome && f.senha === senha
      );

      return encontrado || null;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return null;
    }
  },
    // Buscar um funcionário pelo ID (puxa direto do H2!)
  buscarPorId: async (id: number): Promise<FuncionarioProps | null> => {
    try {
      const response = await fetch(`${BASE_URL}/funcionario/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      return null;
    }
  },

  // Atualizar dados do funcionário
  atualizar: async (id: number, dados: Omit<FuncionarioProps, 'id'>): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/funcionario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  },

};
