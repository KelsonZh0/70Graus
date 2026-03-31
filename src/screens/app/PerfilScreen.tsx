import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { estilosGlobais, CORES, ESPACAMENTO } from '../../styles/themes';
import { FuncionarioService, FuncionarioProps } from '../../services/FuncionarioService';

export default function PerfilScreen() {
  const { navigate } = useNavigation<any>();
  const route = useRoute<any>();
  const funcParam = route.params?.funcionario;

  const [usuario, setUsuario] = useState<FuncionarioProps | null>(funcParam || null);
  const [carregando, setCarregando] = useState(false);
  const [novoEmail, setNovoEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [editandoEmail, setEditandoEmail] = useState(false);
  const [editandoSenha, setEditandoSenha] = useState(false);

  // Toda vez que a tela abre, busca dados FRESCOS do H2
  useFocusEffect(
    useCallback(() => {
      if (funcParam?.id) {
        setCarregando(true);
        FuncionarioService.buscarPorId(funcParam.id).then(dados => {
          if (dados) setUsuario(dados);
          setCarregando(false);
        });
      }
    }, [])
  );

  async function salvarAlteracao(tipo: 'email' | 'senha') {
    if (!usuario?.id) return;
    const dadosAtualizados = {
      nome: usuario.nome,
      email: tipo === 'email' ? novoEmail : usuario.email,
      senha: tipo === 'senha' ? novaSenha : usuario.senha,
    };
    const sucesso = await FuncionarioService.atualizar(usuario.id, dadosAtualizados);
    if (sucesso) {
      Alert.alert('Salvo!', `${tipo === 'email' ? 'E-mail' : 'Senha'} atualizado!`);
      setEditandoEmail(false);
      setEditandoSenha(false);
      setNovoEmail('');
      setNovaSenha('');
      // Recarrega do H2!
      const atualizado = await FuncionarioService.buscarPorId(usuario.id);
      if (atualizado) setUsuario(atualizado);
    } else {
      Alert.alert('Erro', 'Falha ao atualizar no servidor.');
    }
  }

  if (carregando) {
    return <View style={estilosGlobais.centralizador}><ActivityIndicator size="large" color={CORES.amarelo} /></View>;
  }

  return (
    <ScrollView style={estilosGlobais.tela} contentContainerStyle={{ alignItems: 'center', paddingVertical: 40 }}>
      <FontAwesome5 name="user-circle" size={80} color={CORES.amarelo} style={{ marginBottom: 15 }} />
      <Text style={[estilosGlobais.titulo, { color: CORES.textoPrimario }]}>{usuario?.nome}</Text>
      <Text style={[estilosGlobais.texto, { color: CORES.textoSecundario, marginBottom: 30 }]}>{usuario?.email}</Text>

      <View style={{ width: '85%', backgroundColor: CORES.fundoCard, borderRadius: 12, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#333' }}>
        <Text style={{ color: CORES.textoSecundario, fontSize: 12, marginBottom: 4 }}>Nome</Text>
        <Text style={{ color: CORES.textoPrimario, fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>{usuario?.nome}</Text>
        <Text style={{ color: CORES.textoSecundario, fontSize: 12, marginBottom: 4 }}>E-mail</Text>
        <Text style={{ color: CORES.textoPrimario, fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>{usuario?.email}</Text>
        <Text style={{ color: CORES.textoSecundario, fontSize: 12, marginBottom: 4 }}>Senha</Text>
        <Text style={{ color: CORES.textoPrimario, fontSize: 16, fontWeight: 'bold' }}>••••••••</Text>
      </View>

      {!editandoEmail ? (
        <TouchableOpacity style={{ width: '85%', backgroundColor: '#333', padding: 14, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10 }} onPress={() => setEditandoEmail(true)}>
          <FontAwesome5 name="envelope" size={16} color={CORES.amarelo} />
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Alterar E-mail</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: '85%', marginBottom: 10 }}>
          <TextInput style={[estilosGlobais.input, { marginBottom: 10 }]} placeholder="Novo e-mail" placeholderTextColor={CORES.textoDesabilitado} value={novoEmail} onChangeText={setNovoEmail} keyboardType="email-address" autoCapitalize="none" />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={[estilosGlobais.botaoPrimario, { flex: 1 }]} onPress={() => salvarAlteracao('email')}><Text style={estilosGlobais.botaoPrimarioTexto}>Salvar</Text></TouchableOpacity>
            <TouchableOpacity style={[estilosGlobais.botaoPrimario, { flex: 1, backgroundColor: '#555' }]} onPress={() => setEditandoEmail(false)}><Text style={[estilosGlobais.botaoPrimarioTexto, { color: '#fff' }]}>Cancelar</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {!editandoSenha ? (
        <TouchableOpacity style={{ width: '85%', backgroundColor: '#333', padding: 14, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }} onPress={() => setEditandoSenha(true)}>
          <FontAwesome5 name="key" size={16} color={CORES.amarelo} />
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Alterar Senha</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: '85%', marginBottom: 20 }}>
          <TextInput style={[estilosGlobais.input, { marginBottom: 10 }]} placeholder="Nova senha (mín. 6 caracteres)" placeholderTextColor={CORES.textoDesabilitado} value={novaSenha} onChangeText={setNovaSenha} secureTextEntry />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={[estilosGlobais.botaoPrimario, { flex: 1 }]} onPress={() => salvarAlteracao('senha')}><Text style={estilosGlobais.botaoPrimarioTexto}>Salvar</Text></TouchableOpacity>
            <TouchableOpacity style={[estilosGlobais.botaoPrimario, { flex: 1, backgroundColor: '#555' }]} onPress={() => setEditandoSenha(false)}><Text style={[estilosGlobais.botaoPrimarioTexto, { color: '#fff' }]}>Cancelar</Text></TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[estilosGlobais.botaoPrimario, { backgroundColor: CORES.vermelho, width: '85%', flexDirection: 'row', justifyContent: 'center', gap: 10 }]}
        onPress={() => navigate('LoginScreen')}
      >
        <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
        <Text style={[estilosGlobais.botaoPrimarioTexto, { color: '#fff' }]}>Sair da Sessão</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
