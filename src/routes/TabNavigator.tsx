import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import ListaProdutos from '../screens/app/ListaProdutos';
import PainelEstoqueScreen from '../screens/app/PainelEstoqueScreen';
import { CORES } from '../styles/themes';
import PerfilScreen from '../screens/app/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ route }: any) {
  const funcionario = route.params?.funcionario;

  return (
    <Tab.Navigator
      id="AppTabs"
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
if (route.name === 'HomeProdutos') {
            return <FontAwesome5 name="box" size={size} color={color} />;
          } else if (route.name === 'PainelEstoque') {
            return <FontAwesome5 name="clipboard-list" size={size} color={color} />;
          } else if (route.name === 'MeuPerfil') {
            return <FontAwesome5 name="user" size={size} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: CORES.amarelo,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#333',
        }
      })}
    >

      <Tab.Screen 
        name="HomeProdutos" 
        component={ListaProdutos} 
        options={{ title: 'Produtos' }} 
      />
      
      <Tab.Screen 
        name="PainelEstoque" 
        component={PainelEstoqueScreen} 
        options={{ title: 'Estoque Total' }} 
      />

      <Tab.Screen 
        name="MeuPerfil" 
        component={PerfilScreen} 
        options={{ title: 'Perfil' }} 
        initialParams={{ funcionario }}
      />

      
    </Tab.Navigator>
  );
}
