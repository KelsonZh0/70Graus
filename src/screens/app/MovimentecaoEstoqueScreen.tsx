import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { estilosGlobais, CORES, ESPACAMENTO } from '../../styles/themes';
import { MovimentacaoService } from '../../services/MovimentacaoService';
import { EstoqueService } from '../../services/EstoqueService';


export default function MovimentacaoEstoqueScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const { estoque } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState<'ENTRADA' | 'SAÍDA'>('ENTRADA');
  const [quantidade, setQuantidade] = useState('');

async function handleSalvarMovimentacao() {
    if (!quantidade || parseInt(quantidade) <= 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida para mover!');
      return;
    }
    if (!estoque?.id) {
      Alert.alert('Erro crítico', 'Nenhum ID de estoque recebido na tela.');
      return;
    }
    setLoading(true);
    const qtdeNumero = parseInt(quantidade);
    const dataAtual = new Date().toISOString().split('T')[0];
    // Passo 1: Salva o Papel do Histórico no BD (Via POST /movi-estoque)
    const sucessoMov = await MovimentacaoService.criarMovimentacao({
      estoqueId: estoque.id,
      funcionarioId: 1, 
      tipoMovimentacao: tipo, // Envia ENTRADA ou SAÍDA para o Java
      quantidade: qtdeNumero,
      dataMovimentacao: dataAtual,
    });
    if (sucessoMov) {
      // Passo 2: O App vai fazer as contas de Matemática!
      let novaQuantidade = estoque.quantidadeDisponivel;
      
      if (tipo === 'ENTRADA') {
        novaQuantidade += qtdeNumero; // Soma peças
      } else {
        novaQuantidade -= qtdeNumero; // Tira peças
        if(novaQuantidade < 0) novaQuantidade = 0; // Trava para não ter saldo negativo no App
      }
      // Monta as engrenagens para devolver os números para o Serviço Antigo
      const novoEstoqueAtualizado = {
        produtoId: estoque.produtoId,
        quantidadeMinima: estoque.quantidadeMinima,
        quantidadeDisponivel: novaQuantidade
      };
      // Passo 3: Manda o Front avisar ao Java do NOVO Saldo! (Via PUT /estoque/{id})
      await EstoqueService.atualizar(estoque.id, novoEstoqueAtualizado);
      Alert.alert('Balanço Atualizado', `A ${tipo.toLowerCase()} foi feita. Novo saldo físico: ${novaQuantidade}`);
      navigation.goBack();
    } else {
      Alert.alert('Falha', 'Não foi possível salvar o histórico. Tente ver se o Spring Boot subiu.');
    }
    
    setLoading(false);
  }

  return (
    <View style={estilosGlobais.tela}>
      <View style={estilosGlobais.conteudo}>
        <Text style={[estilosGlobais.titulo, { marginTop: 20, color: CORES.textoPrimario }]}>
          <FontAwesome5 name="exchange-alt" size={24} color={CORES.amarelo} /> Nova Movimentação
        </Text>

        <View style={estilosGlobais.formulario}>
          <Text style={estilosGlobais.label}>Tipo de Lançamento:</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            <TouchableOpacity 
              style={[
                estilosGlobais.botaoPrimario, 
               { flex: 1, backgroundColor: tipo === 'ENTRADA' ? CORES.verde : '#333' }

              ]}
              onPress={() => setTipo('ENTRADA')}
            >
              <Text style={estilosGlobais.botaoPrimarioTexto}>ENTRADA</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                estilosGlobais.botaoPrimario, 
               { flex: 1, backgroundColor: tipo === 'SAÍDA' ? CORES.vermelho : '#333' }

              ]}
              onPress={() => setTipo('SAÍDA')}
            >
              <Text style={estilosGlobais.botaoPrimarioTexto}>SAÍDA</Text>
            </TouchableOpacity>
          </View>

          <Text style={estilosGlobais.label}>Quantidade Movimentada</Text>
          <TextInput 
            style={estilosGlobais.input} 
            value={quantidade} 
            onChangeText={setQuantidade} 
            keyboardType="numeric" 
            placeholder="Ex: 10" 
            placeholderTextColor={CORES.textoDesabilitado} 
          />

          <TouchableOpacity 
            style={[estilosGlobais.botaoPrimario, { marginTop: ESPACAMENTO.xl }]} 
            onPress={handleSalvarMovimentacao} 
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#000" /> : <Text style={estilosGlobais.botaoPrimarioTexto}>Gravar Movimento</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
