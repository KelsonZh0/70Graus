// src/navigation/AuthNavigator.tsx

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import CadastroScreen from "../screens/auth/CadastroScreen";
import ListaProdutos from "../screens/app/ListaProdutos";
import FormProdutoScreen from "../screens/app/FormProdutoScreen";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator id="AuthNavigator">
            <Stack.Screen 
                name="LoginScreen" 
                component={LoginScreen} 
                // Mudando o título e pintando o fundo de preto:
                options={{ 
                    title: 'Login',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff' // Cor da letra
                }} 
            />
            <Stack.Screen 
                name="CadastroScreen" 
                component={CadastroScreen} 
                // Mudando o título e pintando o fundo de preto:
                options={{ 
                    title: 'Cadastro',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff' // Cor da letra
                }} 
            />
            <Stack.Screen 
                name="ListaProdutos" 
                component={ListaProdutos} 
                // Mudando o título e pintando o fundo de preto:
                options={{ 
                    title: 'Lista de Produtos',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff' // Cor da letra
                }} 
            />
            <Stack.Screen 
                name="FormProduto" 
                component={FormProdutoScreen} 
                options={{ 
                    title: 'Cadastrar Produto', // Título da tela
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff' 
                }} 
            />
            <Stack.Screen 
                name="TabsApp" 
                component={TabNavigator} 
                options={{ 
                    title: 'Bem-vindo(a)!', 
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff',
                    headerBackVisible: false // Remove a seta de voltar pro Login (não queremos que volte sem deslogar)
                }} 
            />

        </Stack.Navigator>
    );
}





