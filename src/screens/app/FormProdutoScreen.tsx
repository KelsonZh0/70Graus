import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { estilosGlobais, CORES, ESPACAMENTO } from '../../styles/themes';
import { ProdutoService } from '../../services/ProdutoService';

export default function FormProdutoScreen() {
  const { goBack } = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [sku, setSku] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [marca, setMarca] = useState('');

  async function handleSalvar() {
    if (!nome.trim() || !preco.trim()) {
      Alert.alert('Cuidado', 'Nome e Preço são obrigatórios!');
      return;
    }

    setLoading(true);
    const precoDouble = parseFloat(preco.replace(',', '.')); // Corrige vírgula pra ponto pro JSON

    const sucesso = await ProdutoService.criar({
      nome,
      descricao,
      preco: isNaN(precoDouble) ? 0 : precoDouble,
      sku,
      tamanho,
      cor,
      marca
    });
    setLoading(false);

    if (sucesso) {
      Alert.alert('Top!', 'Produto salvo no Banco de Dados!');
      goBack(); // Fecha essa tela de Formulário e volta pra Lista
    } else {
      Alert.alert('Erro', 'Falha ao salvar. Verifique se o servidor Java está ligado.');
    }
  }

  return (
    <View style={estilosGlobais.tela}>
      <ScrollView contentContainerStyle={estilosGlobais.conteudo}>
        <Text style={[estilosGlobais.titulo, { marginTop: 20, fontSize: 24, color: CORES.textoPrimario, fontWeight: 'bold' }]}>Novo Produto</Text>

        <View style={estilosGlobais.formulario}>
          <Text style={estilosGlobais.label}>Nome *</Text>
          <TextInput style={estilosGlobais.input} value={nome} onChangeText={setNome} placeholder="Camiseta Regata" placeholderTextColor={CORES.textoDesabilitado} />

          <Text style={estilosGlobais.label}>Descrição</Text>
          <TextInput style={estilosGlobais.input} value={descricao} onChangeText={setDescricao} placeholder="Algodão orgânico..." placeholderTextColor={CORES.textoDesabilitado} />

          <Text style={estilosGlobais.label}>Preço *</Text>
          <TextInput style={estilosGlobais.input} value={preco} onChangeText={setPreco} keyboardType="numeric" placeholder="120.50" placeholderTextColor={CORES.textoDesabilitado} />

          <Text style={estilosGlobais.label}>SKU</Text>
          <TextInput style={estilosGlobais.input} value={sku} onChangeText={setSku} placeholder="CAM-01" placeholderTextColor={CORES.textoDesabilitado} />

          <Text style={estilosGlobais.label}>Tamanho</Text>
          <TextInput style={estilosGlobais.input} value={tamanho} onChangeText={setTamanho} placeholder="M" placeholderTextColor={CORES.textoDesabilitado} />

          <Text style={estilosGlobais.label}>Cor</Text>
          <TextInput style={estilosGlobais.input} value={cor} onChangeText={setCor} placeholder="Azul" placeholderTextColor={CORES.textoDesabilitado} />

          <Text style={estilosGlobais.label}>Marca</Text>
          <TextInput style={estilosGlobais.input} value={marca} onChangeText={setMarca} placeholder="Nike" placeholderTextColor={CORES.textoDesabilitado} />


          <TouchableOpacity style={[estilosGlobais.botaoPrimario, { marginTop: ESPACAMENTO.xl, marginBottom: 50 }]} onPress={handleSalvar} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={estilosGlobais.botaoPrimarioTexto}>Cadastrar Produto</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
