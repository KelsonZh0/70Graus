import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FuncionarioService } from '../../services/FuncionarioService'
import { StatusBar } from 'expo-status-bar';
import { CORES, ESPACAMENTO, estilosGlobais, FONTE, RAIO } from '../../styles/themes';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function LoginScreen() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const{navigate} = useNavigation()

async function handleLogin() {
  if (!nome || !senha) {
    Alert.alert('Atenção', 'Preencha o nome e a senha!');
    return;
  }
  if (senha.length < 6) {
    Alert.alert('Atenção', 'A senha precisa ter no mínimo 6 caracteres.');
    return;
  }

  setIsLoading(true);

  const funcionario = await FuncionarioService.login(nome, senha);

  setIsLoading(false);

   if (funcionario) {
    Alert.alert('Bem-vindo(a)!', `Olá, ${funcionario.nome}!`);
    navigate('TabsApp' as any, { funcionario });

  } else {
    Alert.alert('Erro', 'Nome ou senha incorretos. Verifique seus dados.');
  }
}



  return (
<KeyboardAvoidingView
      style={estilosGlobais.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <View style={estilos.container}>
        <View style={estilos.cabecalho}>
          <FontAwesome5 
            name="box" 
            size={56} 
            color={CORES.textoPrimario} 
            style={{ marginBottom: ESPACAMENTO.sm }} 
          />
          <Text style={estilos.titulo}>70 Graus</Text>
          <Text style={estilos.subtitulo}>Faça login para continuar</Text>
        </View>


        <View style={estilos.formulario}>
          <Text style={estilos.label}>Nome</Text>
          <TextInput
            style={estilos.input}
            placeholder="Seu nome"
            placeholderTextColor={CORES.textoDesabilitado}
            value={nome}
            onChangeText={setNome}
            autoCapitalize="none"
            keyboardType="default"
          />

          <Text style={estilos.label}>Senha</Text>
          <TextInput
            style={estilos.input}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor={CORES.textoDesabilitado}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity
            style={[estilosGlobais.botaoPrimario, isLoading && estilos.botaoDesabilitado]}
            onPress={handleLogin}
            disabled={!!isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={CORES.textoPrimario} />
            ) : (
              <Text style={estilosGlobais.botaoPrimarioTexto}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={estilosGlobais.botaoSecundario}
            onPress={() => navigate('CadastroScreen')}
          >
            <Text style={estilosGlobais.botaoSecundarioTexto}>
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>


        <Text style={estilos.dica}>
          <FontAwesome5 name="lightbulb" size={14} color={CORES.amarelo} solid />{' '}
          Nome cadastrado e senha com 6+ caracteres funciona
        </Text>
      </View>

 </KeyboardAvoidingView> 
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: ESPACAMENTO.lg,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: ESPACAMENTO.xl,
  },
  logo: {
    fontSize: 56,
    marginBottom: ESPACAMENTO.sm,
  },
  titulo: {
    fontSize: FONTE.xxl,
    fontWeight: 'bold',
    color: CORES.textoPrimario,
  },
  subtitulo: {
    fontSize: FONTE.md,
    color: CORES.textoSecundario,
    marginTop: ESPACAMENTO.xs,
  },
  formulario: {
    gap: ESPACAMENTO.xs,
  },
  label: {
    fontSize: FONTE.sm,
    fontWeight: '600',
    color: CORES.textoSecundario,
    marginTop: ESPACAMENTO.sm,
    marginBottom: 4,
  },
  input: {
    backgroundColor: CORES.fundoInput,
    borderRadius: RAIO.md,
    borderWidth: 1,
    borderColor: CORES.borda,
    color: CORES.textoPrimario,
    fontSize: FONTE.md,
    paddingHorizontal: ESPACAMENTO.md,
    paddingVertical: ESPACAMENTO.sm + 4,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  dica: {
    textAlign: 'center',
    color: CORES.textoDesabilitado,
    fontSize: FONTE.sm,
    marginTop: ESPACAMENTO.xl,
  },
});
