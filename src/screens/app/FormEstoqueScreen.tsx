import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { estilosGlobais, CORES, ESPACAMENTO } from '../../styles/themes';
import { EstoqueService, EstoqueProps } from '../../services/EstoqueService';

export default function FormEstoqueScreen() {
  const { goBack, navigate } = useNavigation<any>();
  const route = useRoute<any>();
  
  // Pegamos o objeto produto que a ListaProdutos vai mandar para cá
  const produto = route.params?.produto;

  const [loading, setLoading] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(true);
  
  const [estoqueAtual, setEstoqueAtual] = useState<EstoqueProps | null>(null);

  const [qtdeDisponivel, setQtdeDisponivel] = useState('');
  const [qtdeMinima, setQtdeMinima] = useState('');

  // Ao montar a tela, vamos "Bater" na API do Java e ver se tem estoque!
  useFocusEffect(
    useCallback(() => {
      buscarEstoque();
    }, [])
  );

  async function buscarEstoque() {
    if (!produto?.id) return;
    
    setCarregandoDados(true);
    const dados = await EstoqueService.buscarPorProduto(produto.id);
    if (dados) {
      setEstoqueAtual(dados); // Achou, salva a ID pra poder fazer edição (PUT) depois
      setQtdeDisponivel(String(dados.quantidadeDisponivel));
      setQtdeMinima(String(dados.quantidadeMinima));
    }
    setCarregandoDados(false);
  }

  async function handleSalvar() {
    if (!qtdeDisponivel || !qtdeMinima) {
      Alert.alert('Cuidado', 'Preencha as quantidades!');
      return;
    }

    setLoading(true);

    const estoqueSalvo = {
      produtoId: produto.id,
      quantidadeDisponivel: parseInt(qtdeDisponivel, 10),
      quantidadeMinima: parseInt(qtdeMinima, 10)
    };

    let sucesso = false;
    
    if (estoqueAtual?.id) {
      sucesso = await EstoqueService.atualizar(estoqueAtual.id, estoqueSalvo);
    } else {
      sucesso = await EstoqueService.criar(estoqueSalvo);
    }

    setLoading(false);

    if (sucesso) {
      Alert.alert('Carga Sucesso!', 'Os números de estoque foram salvos!');
      goBack(); 
    } else {
      Alert.alert('Erro fatal', 'Java não conectou (URL errada) ou Cód. 500 no Banco de Dados.');
    }
  }

  return (
    <View style={estilosGlobais.tela}>
      <View style={estilosGlobais.conteudo}>
        <Text style={[estilosGlobais.titulo, { marginTop: 20, color: CORES.textoPrimario }]}>
          <FontAwesome5 name="box-open" size={24} color={CORES.amarelo} /> Gestão de Estoque
        </Text>
        <Text style={[estilosGlobais.subtitulo, { color: CORES.textoSecundario, marginBottom: 20 }]}>
          Editando Saldo de: <Text style={{ color: CORES.amarelo }}>{produto?.nome}</Text>
        </Text>

        {carregandoDados ? (
           <ActivityIndicator size="large" color={CORES.amarelo} style={{ marginTop: 50 }} />
        ) : (
          <View style={estilosGlobais.formulario}>
            <Text style={estilosGlobais.label}>Peças Físicas na Loja</Text>
            <TextInput 
              style={estilosGlobais.input} 
              value={qtdeDisponivel} 
              onChangeText={setQtdeDisponivel} 
              keyboardType="numeric" 
              placeholder="Ex: 50" 
              placeholderTextColor={CORES.textoDesabilitado} 
            />

            <Text style={estilosGlobais.label}>Alarme de Qtd. Mínima</Text>
            <TextInput 
              style={estilosGlobais.input} 
              value={qtdeMinima} 
              onChangeText={setQtdeMinima} 
              keyboardType="numeric" 
              placeholder="Ex: 5" 
              placeholderTextColor={CORES.textoDesabilitado} 
            />

            {estoqueAtual?.id && (
              <TouchableOpacity 
                style={[estilosGlobais.botaoPrimario, { marginTop: ESPACAMENTO.md, backgroundColor: CORES.amarelo }]} 
                onPress={() => navigate('NovaMovimentacao', { estoque: estoqueAtual })} 
              >
                <Text style={[estilosGlobais.botaoPrimarioTexto, { color: '#000' }]}> Registrar Entrada / Saída de Peças </Text>
              </TouchableOpacity>
            )}

          </View>
        )}
      </View>
    </View>
  );
}
