import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { estilosGlobais, ESPACAMENTO, CORES, FONTE, RAIO } from '../../styles/themes';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { FontAwesome5 } from '@expo/vector-icons';

export default function CadastroScreen() {
  const { goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    console.log("Tentando cadastrar o usuário:", nome, email, senha);
  };

  return (
    <KeyboardAvoidingView
      style={estilosGlobais.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />

      <View style={estilos.container}>
        
        <View style={estilos.cabecalho}>
          <FontAwesome5 
            name="user-plus" 
            size={50} 
            color="#fff" 
            style={{ marginBottom: ESPACAMENTO.md }} 
          />
          <Text style={estilos.titulo}>Criar Conta</Text>
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

          <Text style={estilos.label}>E-mail</Text>
          <TextInput
            style={estilos.input}
            placeholder="Seu e-mail"
            placeholderTextColor={CORES.textoDesabilitado}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
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
            onPress={handleCadastro} 
            disabled={!!isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={CORES.textoPrimario} />
            ) : (
              <Text style={estilosGlobais.botaoPrimarioTexto}>Cadastrar</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={estilosGlobais.botaoSecundario}
          onPress={() => goBack()}
        >
          <Text style={estilosGlobais.botaoSecundarioTexto}>← Voltar ao Login</Text>
        </TouchableOpacity>
        
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
