# 70Graus

Aplicação mobile desenvolvida com **React Native + Expo + TypeScript** para apoiar a operação da marca **70Graus**, com foco em cadastro de produtos, controle de estoque, movimentações e gerenciamento de funcionários.

O projeto foi estruturado para consumir uma **API REST em Java com Spring Boot**, separando claramente a interface mobile da camada de backend.

---

## Visão geral

O app foi pensado para centralizar operações comuns de um pequeno sistema de catálogo e estoque, oferecendo uma interface simples para:

- autenticação de funcionários
- cadastro, edição e exclusão de produtos
- controle de estoque por produto
- registro de entradas e saídas
- visualização consolidada do estoque
- manutenção de dados do usuário autenticado

A aplicação segue uma organização em camadas simples, adequada para projeto acadêmico e protótipo funcional, com separação entre telas, navegação, serviços e tema visual.

---

## Funcionalidades

### Autenticação
- login de funcionário
- cadastro de novo funcionário
- acesso à área autenticada do app

### Gestão de produtos
- listagem de produtos cadastrados
- criação de novos produtos
- edição de produto existente
- exclusão de produto
- controle de atributos como descrição, preço, tamanho, cor, marca e status

### Estoque
- criação e atualização de estoque por produto
- definição de quantidade disponível e quantidade mínima
- painel com visão resumida do estoque

### Movimentações
- registro de movimentações de **entrada** e **saída**
- atualização da quantidade do estoque via backend
- histórico operacional por entidade de movimentação

### Perfil
- visualização dos dados do funcionário autenticado
- edição de e-mail e senha
- saída da sessão

---

## Stack utilizada

### Mobile
- **Expo**
- **React Native**
- **React 19**
- **TypeScript**

### Navegação
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`

### UI e suporte
- `@expo/vector-icons`
- `expo-status-bar`
- `react-native-safe-area-context`
- `react-native-screens`

### Integração
- `fetch` para consumo da API REST

### Backend integrado
- **Java 17**
- **Spring Boot**
- **Spring Web MVC**
- **Spring Data JPA**
- **H2 Database**
- **Lombok**
- **Jakarta Validation**

---

## Estrutura do projeto mobile

```text
70Graus/
├── App.tsx
├── app.json
├── index.tsx
├── package.json
├── src/
│   ├── routes/
│   │   ├── AuthNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── CadastroScreen.tsx
│   │   │   └── LoginScreen.tsx
│   │   └── app/
│   │       ├── FormEstoqueScreen.tsx
│   │       ├── FormProdutoScreen.tsx
│   │       ├── ListaProdutos.tsx
│   │       ├── MovimentecaoEstoqueScreen.tsx
│   │       ├── PainelEstoqueScreen.tsx
│   │       └── PerfilScreen.tsx
│   ├── services/
│   │   ├── EstoqueService.ts
│   │   ├── FuncionarioService.ts
│   │   ├── MovimentacaoService.ts
│   │   └── ProdutoService.ts
│   └── styles/
│       └── themes.ts
└── android/ / ios/
```

---

## Arquitetura adotada

O projeto segue uma divisão objetiva e fácil de manter:

- **screens**: telas da aplicação, separadas por fluxo público e autenticado
- **routes**: configuração da navegação stack e tabs
- **services**: camada responsável pela comunicação com a API
- **styles**: tema visual e estilos reutilizáveis

Essa abordagem reduz repetição de lógica nas telas e facilita manutenção e evolução do código.

---

## Fluxo de navegação

### Área pública
- **Login**
- **Cadastro**

### Área autenticada
- **Produtos**
- **Estoque Total**
- **Perfil**

Além das abas principais, o app possui telas complementares para:

- cadastro e edição de produto
- cadastro e edição de estoque
- registro de movimentação de estoque

---

## Backend Java

A API utilizada pelo app está em um repositório Java separado.

### Repositório do backend

```bash
git clone https://github.com/alex-isidro/70Graus-.git
```

### Estrutura principal do backend

```text
70Graus--develop/
├── pom.xml
├── src/main/java/fiap/com/br/graus/
│   ├── config/
│   ├── controllers/
│   ├── model/
│   ├── repositories/
│   └── services/
└── src/main/resources/application.properties
```

### Recursos expostos pela API

- `/funcionario`
- `/produtos`
- `/estoque`
- `/movi-estoque`

Esses endpoints cobrem as operações principais consumidas pelo aplicativo mobile.

---

## Requisitos

Antes de executar o projeto, tenha instalado:

### Para o mobile
- **Node.js** LTS
- **npm**
- **Expo CLI via npx**
- **Android Studio** com emulador configurado ou dispositivo físico com Expo Go

### Para o backend
- **Java 17**
- **Maven Wrapper** disponível no projeto (`mvnw` / `mvnw.cmd`)

---

## Como executar

### 1. Suba o backend Java

Clone o backend:

```bash
git clone https://github.com/alex-isidro/70Graus-.git
cd 70Graus-
```

Execute a aplicação Spring Boot:

No Linux / macOS:

```bash
./mvnw spring-boot:run
```

No Windows:

```bash
mvnw.cmd spring-boot:run
```

Por padrão, a API roda em:

```text
http://localhost:8080
```

---

### 2. Execute o app mobile

Dentro do projeto mobile:

```bash
npm install
npm start
```

ou

```bash
npx expo start
```

Para abrir no Android:

```bash
npm run android
```

Para abrir no iOS:

```bash
npm run ios
```

---

## Configuração de acesso à API

A aplicação mobile utiliza como base:

```ts
http://10.0.2.2:8080
```

Esse endereço funciona no **emulador Android**, porque `10.0.2.2` aponta para o `localhost` da máquina hospedeira.

### Se estiver usando dispositivo físico

Troque a URL base dos services para o IP local da sua máquina, por exemplo:

```ts
http://192.168.0.10:8080
```

---

## Scripts do projeto mobile

```bash
npm start       # inicia o Expo
npm run android # executa no Android
npm run ios     # executa no iOS
npm run web     # executa na web
```

---

## Padrão visual

O projeto utiliza um tema centralizado em `src/styles/themes.ts`, com definição de:

- paleta de cores
- espaçamentos
- raios de borda
- tamanhos de fonte
- estilos reutilizáveis

Isso ajuda a manter consistência visual entre as telas e simplifica futuras alterações de layout.

---

## Boas práticas presentes no projeto

- separação entre interface, navegação e camada de serviços
- uso de componentes funcionais
- uso de hooks do React e hooks de navegação
- feedback visual com `ActivityIndicator` e `Alert`
- navegação estruturada com stack e bottom tabs
- tipagem com TypeScript no app mobile
- backend organizado em camadas com controller, service e repository

---

## Pontos de evolução

Como próximos passos, o projeto pode evoluir em:

- autenticação baseada em token
- persistência de sessão no app
- centralização da URL da API em arquivo de configuração ou variável de ambiente
- tipagem mais forte da navegação para reduzir uso de `any`
- melhoria no tratamento de erros na camada de serviços
- componentização adicional de botões, cards e inputs
- documentação dos endpoints com Swagger/OpenAPI
- banco persistente para o backend em vez de H2 em memória

---

## Contexto acadêmico

Este projeto foi desenvolvido com foco em prática de:

- React Native com Expo
- navegação entre telas
- formulários e fluxo CRUD
- consumo de API com `fetch`
- integração com backend Java
- organização de código em camadas simples

---

## Autor

Desenvolvido por:

**Alexander Isidro**

**Kelson Zhang**

---
Projeto acadêmico desenvolvido para fins de estudo e prática em desenvolvimento mobile e integração com backend Java.
