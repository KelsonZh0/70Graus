const BASE_URL = 'http://10.0.2.2:8080'; // Cuidado: No celular físico, coloque o IP da sua máquina tipo 192.168.x.x

// Tipagem idêntica aos atributos do seu Java
export interface ProdutoProps {
  id?: number; 
  nome: string;
  descricao: string;
  preco: number;
  sku: string;
  tamanho: string;
  cor: string;
  marca: string;
  ativo: boolean;
}

export const ProdutoService = {
  // Buscar a lista ("Ler")
  listar: async (): Promise<ProdutoProps[]> => {
    try {
      const response = await fetch(`${BASE_URL}/produtos`);
      return await response.json();
    } catch (error) {
      console.error("Erro na busca:", error);
      return [];
    }
  },

  // Cadastrar Produto
  criar: async (produto: Omit<ProdutoProps, 'id' | 'ativo'>) => {
    try {
      const produtoCompleto = { ...produto, ativo: true };
      const response = await fetch(`${BASE_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoCompleto)
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  // Excluir
  excluir: async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/produtos/${id}`, { method: 'DELETE' });
      return response.ok;
    } catch {
      return false;
    }
  }
};
