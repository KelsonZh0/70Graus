const BASE_URL = 'http://10.0.2.2:8080'; 

export interface EstoqueProps {
  id?: number;
  produtoId: number;
  quantidadeDisponivel: number;
  quantidadeMinima: number;
}

export const EstoqueService = {
  // ATUALIZADO: Agora ele puxa TODOS os estoques e pesquisa usando a inteligência do App!
  buscarPorProduto: async (produtoId: number): Promise<EstoqueProps | null> => {
    try {
      const response = await fetch(`${BASE_URL}/estoque`); // Busca geral
      if (!response.ok) return null;

      const todosOsEstoques: EstoqueProps[] = await response.json();
      
      // O App varre a lista e pega o último estoque cadastrado para esse produto
      const listaDoProduto = todosOsEstoques.filter(est => est.produtoId === produtoId);
      
      if (listaDoProduto.length > 0) {
        // Pega sempre a linha mais recente que você salvou no H2 (a de maior ID)
        return listaDoProduto[listaDoProduto.length - 1]; 
      }
      
      return null;
    } catch (error) {
      console.log('Erro ao buscar estoque:', error);
      return null;
    }
  },

  criar: async (estoque: Omit<EstoqueProps, 'id'>) => {
    try {
      const response = await fetch(`${BASE_URL}/estoque`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estoque),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  atualizar: async (id: number, estoque: Omit<EstoqueProps, 'id'>) => {
    try {
      const response = await fetch(`${BASE_URL}/estoque/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estoque),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};
