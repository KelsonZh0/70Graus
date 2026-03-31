import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { estilosGlobais, CORES, ESPACAMENTO, RAIO } from '../../styles/themes';
import { ProdutoService, ProdutoProps } from '../../services/ProdutoService';
import { EstoqueService, EstoqueProps } from '../../services/EstoqueService';

// Tipo que não existe no Java, criado na Mente do App para misturar os dois
type LinhaTabelaProps = {
  produto: ProdutoProps;
  estoque: EstoqueProps | null;
};

export default function PainelEstoqueScreen() {
  const { navigate } = useNavigation<any>();
  const [dadosTabela, setDadosTabela] = useState<LinhaTabelaProps[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      montarRelatorio();
    }, [])
  );

  async function montarRelatorio() {
    setCarregando(true);
    
    // 1. Puxa todos os Produtos Existentes
    const produtosApi = await ProdutoService.listar();
    
    // 2. Faz uma verdadeira Tempestade de Pesquisas: para cada produto, puxa seu estoque
    const promessasDeEstoque = produtosApi.map(async (prod) => {
      const respEstoque = prod.id ? await EstoqueService.buscarPorProduto(prod.id) : null;
      return {
        produto: prod,
        estoque: respEstoque
      };
    });

    // 3. O App espera baixar os N estoques todos de uma vez (Super Rápido em Paralelo)
    const relatorioPronto = await Promise.all(promessasDeEstoque);
    
    setDadosTabela(relatorioPronto);
    setCarregando(false);
  }

  // Desenhando cada Linha da Tabela Exigente do Chefe!
  const renderFila = ({ item }: { item: LinhaTabelaProps }) => {
    // 🚨 A Inteligência dos Alertas Coloridos do Lojista
    const temEstoque = item.estoque !== null;
    const qtdeAtual = temEstoque ? item.estoque!.quantidadeDisponivel : 0;
    const qtdeMinima = temEstoque ? item.estoque!.quantidadeMinima : 0;
    
    let corDoStatus: string = CORES.verde; // Tudo Suave
    let iconeStatus: string = "check-circle";

    if (!temEstoque) {
      corDoStatus = CORES.textoDesabilitado; // Prende a borda de Cinza (Nunca Registrou Estoque)
      iconeStatus = "question-circle";
    } else if (qtdeAtual <= 0) {
      corDoStatus = CORES.vermelho; // VERMELHO TOTAL! Esgotou (Sem Tênis p vender)
      iconeStatus = "times-circle";
    } else if (qtdeAtual <= qtdeMinima) {
      corDoStatus = CORES.amarelo; // ATENÇÃO AMARELA! Bateu no Mínimo, vai acabar.
      iconeStatus = "exclamation-triangle";
    }

    return (
      <TouchableOpacity 
         style={[estilos.cardTabela, { borderLeftColor: corDoStatus, borderLeftWidth: 5 }]}
         onPress={() => navigate('FormEstoque', { produto: item.produto })} // Se o dono clicar na linha da tabela, ele abre a sua telinha secreta de Estoque direto!!
      >
        <View style={{ flex: 1 }}>
          <Text style={estilosGlobais.subtitulo} numberOfLines={1}>{item.produto.nome}</Text>
          <Text style={estilosGlobais.texto}>Cód: {item.produto.sku || 'Sem Código'}</Text>
        </View>

        <View style={{ alignItems: 'flex-end', marginLeft: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: corDoStatus }}>
               {temEstoque ? qtdeAtual : '---'}
            </Text>
            <FontAwesome5 name={iconeStatus} size={16} color={corDoStatus} solid />
          </View>
          <Text style={{ fontSize: 11, color: CORES.textoSecundario }}>
            Mín: {temEstoque ? qtdeMinima : '---'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={estilosGlobais.tela}>
      <View style={estilosGlobais.conteudo}>
        <View style={estilos.cabecalhoDashboard}>
          <FontAwesome5 name="chart-pie" size={28} color={CORES.amarelo} />
          <Text style={[estilosGlobais.titulo, { marginLeft: 10, marginTop: 5 }]}>Dashboard</Text>
        </View>
        
<Text style={[estilosGlobais.texto, { color: CORES.textoSecundario, marginBottom: 15 }]}>
          Monitoramento em tempo real do banco de dados.
        </Text>

        {carregando ? (
           <ActivityIndicator size="large" color={CORES.amarelo} style={{ marginTop: 40 }} />
        ) : (
           <FlatList
             data={dadosTabela}
             keyExtractor={(item, index) => String(item.produto.id || index)}
             renderItem={renderFila}
             contentContainerStyle={{ gap: ESPACAMENTO.sm, paddingBottom: 20 }}
             ListEmptyComponent={<Text style={estilosGlobais.texto}>Sem produtos no Java para analisar.</Text>}
           />
        )}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cabecalhoDashboard: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  cardTabela: { 
    backgroundColor: CORES.fundoCard, 
    paddingHorizontal: ESPACAMENTO.md, 
    paddingVertical: 12,
    borderRadius: RAIO.md, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    borderColor: '#333', 
    borderWidth: 1 
  }
});
