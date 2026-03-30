import React from 'react';
import { View, Text } from 'react-native';
import { estilosGlobais, CORES } from '../../styles/themes';

export default function PerfilScreen() {
  return (
    <View style={estilosGlobais.centralizador}>
      <Text style={[estilosGlobais.titulo, { color: CORES.textoPrimario }]}>Meu Perfil</Text>
      <Text style={estilosGlobais.texto}>As informações do usuário virão aqui depois.</Text>
    </View>
  );
}
