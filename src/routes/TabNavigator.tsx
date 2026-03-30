import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import ListaProdutos from '../screens/app/ListaProdutos';
import PerfilScreen from '../screens/app/PerfilScreen';
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
          } else if (route.name === 'Perfil') {
            return <FontAwesome5 name="user-alt" size={size} color={color} />;
          }
          return null; // Caso não encontre aba (fallback)
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
        name="Perfil" 
        component={PerfilScreen} 
        options={{ title: 'Perfil' }} 
      />
    </Tab.Navigator>
  );
}
