import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { estilosGlobais, CORES, ESPACAMENTO } from '../../styles/themes';
import { MovimentacaoService } from '../../services/MovimentacaoService';

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

    const qtdeNumero = parseInt(quantidade);

    if (tipo === 'SAÍDA' && qtdeNumero > estoque.quantidadeDisponivel) {
      Alert.alert(
        'Estoque insuficiente',
        `Só existem ${estoque.quantidadeDisponivel} peças disponíveis. Você tentou retirar ${qtdeNumero}.`
      );
      return;
    }

    setLoading(true);
    const dataAtual = new Date().toISOString().split('T')[0];

    const sucessoMov = await MovimentacaoService.criarMovimentacao({
      estoqueId: estoque.id,
      funcionarioId: 1,
      tipoMovimentacao: tipo,
      quantidade: qtdeNumero,
      dataMovimentacao: dataAtual,
    });

    if (sucessoMov) {
      Alert.alert('Movimentação registrada!', `A ${tipo.toLowerCase()} de ${qtdeNumero} peças foi salva com sucesso.`);
      navigation.goBack();
    } else {
      Alert.alert(
        'Operação recusada',
        tipo === 'SAÍDA'
          ? `O servidor bloqueou a saída. Verifique se há ${qtdeNumero} peças disponíveis no estoque.`
          : 'Não foi possível registrar a movimentação. Verifique se o Spring Boot está rodando.'
      );
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
