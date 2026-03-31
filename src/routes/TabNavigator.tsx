import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import ListaProdutos from '../screens/app/ListaProdutos';
import PainelEstoqueScreen from '../screens/app/PainelEstoqueScreen';
import { CORES } from '../styles/themes';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      id="AppTabs"
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'HomeProdutos') {
            return <FontAwesome5 name="box" size={size} color={color} />;
          } else if (route.name === 'PainelEstoque') {
            // Ícone novo de Prancheta para o Estoque!
            return <FontAwesome5 name="clipboard-list" size={size} color={color} />;
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
      
      {/* Aqui nós matamos a tela de Perfil antiga e Injetamos o Dashboard Novo! */}
      <Tab.Screen 
        name="PainelEstoque" 
        component={PainelEstoqueScreen} 
        options={{ title: 'Estoque Total' }} 
      />
      
    </Tab.Navigator>
  );
}
