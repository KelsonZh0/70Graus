import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { estilosGlobais, CORES, ESPACAMENTO, RAIO } from '../../styles/themes';
import { ProdutoService, ProdutoProps } from '../../services/ProdutoService';

export default function ListaProdutos() {
  const { navigate } = useNavigation<NavigationProp<any>>();
  const [produtos, setProdutos] = useState<ProdutoProps[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    setCarregando(true);
    const dadosApi = await ProdutoService.listar();
    setProdutos(dadosApi);
    setCarregando(false);
  }

  async function handleExcluir(id: number | undefined) {
    if(!id) return;
    const deletou = await ProdutoService.excluir(id);
    if (deletou) {
      setProdutos(prev => prev.filter(p => p.id !== id));
      Alert.alert('Sucesso', 'Produto excluído do MySQL!');
    }
  }

  const renderItem = ({ item }: { item: ProdutoProps }) => (
    <View style={estilos.cardProduto}>
      <View style={{ flex: 1 }}>
        <Text style={estilosGlobais.subtitulo}>{item.nome}</Text>
        <Text style={estilosGlobais.texto}>Preço: R$ {item.preco}</Text>
        <Text style={[estilosGlobais.textoDestaque, { color: item.ativo ? CORES.verde : CORES.vermelho }]}>
          {item.ativo ? 'Ativo' : 'Desativado'}
        </Text>
      </View>
      
      {/* 🚀 AQUI ESTÁ A MÁGICA DOS 3 BOTÕES: Estoque, Editar e Excluir */}
      <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
        
        <TouchableOpacity 
          style={[estilos.botaoAcao, { backgroundColor: '#3b82f6', flexDirection: 'row', alignItems: 'center', gap: 6 }]} 
          onPress={() => navigate('FormEstoque' as any, { produto: item })}
        >
           <FontAwesome5 name="box-open" size={14} color="#fff" solid />
           <Text style={[estilos.textoAcao, { color: '#fff' }]}>Estoque</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[estilos.botaoAcao, { backgroundColor: CORES.amarelo }]} 
          onPress={() => navigate('FormProduto' as any, { produto: item })}
        >
           <Text style={[estilos.textoAcao, { color: '#000' }]}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[estilos.botaoAcao, { backgroundColor: CORES.vermelho }]} 
          onPress={() => handleExcluir(item.id)}
        >
           <Text style={[estilos.textoAcao, { color: '#fff' }]}>Excluir</Text>
        </TouchableOpacity>

      </View>

    </View>
  );

  return (
    <View style={estilosGlobais.tela}>
      <View style={estilosGlobais.conteudo}>
        <Text style={estilosGlobais.titulo}>Meus Produtos</Text>

        {carregando ? (
           <ActivityIndicator size="large" color={CORES.amarelo} style={{ marginTop: 20 }} />
        ) : (
           <FlatList
             data={produtos}
             keyExtractor={item => String(item.id)}
             renderItem={renderItem}
             contentContainerStyle={{ gap: ESPACAMENTO.xs, paddingBottom: 20 }}
             ListEmptyComponent={<Text style={estilosGlobais.texto}>Nenhum produto cadastrado no Java.</Text>}
           />
        )}

        <TouchableOpacity style={estilosGlobais.botaoPrimario} onPress={() => navigate('FormProduto')}>
          <Text style={estilosGlobais.botaoPrimarioTexto}>+ Novo Produto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cardProduto: { backgroundColor: CORES.fundoCard, padding: ESPACAMENTO.md, borderRadius: RAIO.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: CORES.borda, borderWidth: 1 },
  botaoAcao: { padding: 8, borderRadius: RAIO.sm, alignItems: 'center' },
  textoAcao: { fontSize: 13, fontWeight: 'bold' }
});
