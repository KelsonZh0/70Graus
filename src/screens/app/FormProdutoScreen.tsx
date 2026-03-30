import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { estilosGlobais, CORES, ESPACAMENTO } from '../../styles/themes';
import { ProdutoService } from '../../services/ProdutoService';

export default function FormProdutoScreen() {
  const { goBack } = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const route = useRoute<any>();
  const produtoEdicao = route.params?.produto;

  const [nome, setNome] = useState(produtoEdicao ? produtoEdicao.nome : '');
  const [descricao, setDescricao] = useState(produtoEdicao ? produtoEdicao.descricao : '');
  const [preco, setPreco] = useState(produtoEdicao ? String(produtoEdicao.preco) : '');
  const [sku, setSku] = useState(produtoEdicao ? produtoEdicao.sku : '');
  const [tamanho, setTamanho] = useState(produtoEdicao ? produtoEdicao.tamanho : '');
  const [cor, setCor] = useState(produtoEdicao ? produtoEdicao.cor : '');
  const [marca, setMarca] = useState(produtoEdicao ? produtoEdicao.marca : '');


  async function handleSalvar() {
    if (!nome.trim() || !preco.trim()) {
      Alert.alert('Cuidado', 'Nome e Preço são obrigatórios!');
      return;
    }

    setLoading(true);
    const precoDouble = parseFloat(preco.replace(',', '.'));
    const produtoSalvo = {
      nome,
      descricao,
      preco: isNaN(precoDouble) ? 0 : precoDouble,
      sku,
      tamanho,
      cor,
      marca
    };

    let sucesso = false;
    
    if (produtoEdicao?.id) {
      sucesso = await ProdutoService.atualizar(produtoEdicao.id, produtoSalvo);
    } else {
      sucesso = await ProdutoService.criar(produtoSalvo);
    }

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
