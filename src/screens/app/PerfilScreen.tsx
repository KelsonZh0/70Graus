import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { estilosGlobais, CORES } from '../../styles/themes';

export default function PerfilScreen() {
  const { navigate } = useNavigation<any>();

  return (
    <View style={estilosGlobais.centralizador}>
      {/* Um desenho visual pro seu perfil ficar caprichado */}
      <FontAwesome5 name="user-circle" size={80} color={CORES.amarelo} style={{ marginBottom: 20 }} />
      <Text style={[estilosGlobais.titulo, { color: CORES.textoPrimario }]}>Meu Perfil</Text>
      <Text style={[estilosGlobais.texto, { marginBottom: 40 }]}>Detalhes do usuário virão no futuro.</Text>

      {/* O Nosso Botão Oficial de Logout */}
      <TouchableOpacity 
        style={[estilosGlobais.botaoPrimario, { backgroundColor: CORES.vermelho, width: '80%', flexDirection: 'row', justifyContent: 'center', gap: 10 }]}
        onPress={() => {
          // O comando Navigate vai anular as abas e voltar cru para a tela inicial
          navigate('LoginScreen');
        }}
      >
        <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
        <Text style={[estilosGlobais.botaoPrimarioTexto, { color: '#fff' }]}> Sair da Sessão </Text>
      </TouchableOpacity>
    </View>
  );
}
