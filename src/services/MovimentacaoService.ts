const BASE_URL = 'http://10.0.2.2:8080';

export interface MovimentacaoProps {
  estoqueId: number;
  funcionarioId: number;
  tipoMovimentacao: string;
  quantidade: number;
  dataMovimentacao: string;
}

export const MovimentacaoService = {
  criarMovimentacao: async (movimentacao: MovimentacaoProps) => {
    try {
      const response = await fetch(`${BASE_URL}/movi-estoque`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movimentacao),
      });
      return response.ok;
    } catch (error) {
      console.error('Erro na chamada da Movimentação:', error);
      return false;
    }
  }
};
