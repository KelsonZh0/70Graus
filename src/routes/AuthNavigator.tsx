

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import CadastroScreen from "../screens/auth/CadastroScreen";
import ListaProdutos from "../screens/app/ListaProdutos";
import FormProdutoScreen from "../screens/app/FormProdutoScreen";
import TabNavigator from "./TabNavigator";
import FormEstoqueScreen from "../screens/app/FormEstoqueScreen";
import MovimentacaoEstoqueScreen from "../screens/app/MovimentecaoEstoqueScreen";


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator id="AuthNavigator">
            <Stack.Screen 
                name="LoginScreen" 
                component={LoginScreen} 
                options={{ 
                    title: 'Login',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff' 
                }} 
            />
            <Stack.Screen 
                name="CadastroScreen" 
                component={CadastroScreen} 
                options={{ 
                    title: 'Cadastro',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff' 
                }} 
            />
            <Stack.Screen 
                name="ListaProdutos" 
                component={ListaProdutos} 
                options={{ 
                    title: 'Lista de Produtos',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff' 
                }} 
            />
            <Stack.Screen 
                name="FormProduto" 
                component={FormProdutoScreen} 
                options={{ 
                    title: 'Cadastrar Produto', 
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
                    headerBackVisible: false
                }} 
            />

            <Stack.Screen 
                name="FormEstoque" 
                component={FormEstoqueScreen} 
                options={{ 
                    title: 'Controle de Estoque',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff' 
                }} 
            />
                <Stack.Screen 
                name="NovaMovimentacao" 
                component={MovimentacaoEstoqueScreen} 
                options={{ 
                    title: 'Entrada / Saída',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: '#000' },
                    headerTintColor: '#fff' 
                }} 
            />


        </Stack.Navigator>
    );
}





