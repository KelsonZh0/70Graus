# 70Graus

Aplicação mobile desenvolvida com **React Native + Expo + TypeScript** para apoiar a operação da **70Graus**, com foco em **produtos, estoque, movimentações e funcionários**.

O projeto consome uma **API REST em Java com Spring Boot**, separando a camada mobile da regra de negócio no backend.

---

## Preview

- Login e cadastro de funcionário
- CRUD de produtos
- Controle de estoque por produto
- Registro de entrada e saída
- Painel resumido de estoque
- Perfil do usuário autenticado

---

## Stack

### Mobile
- Expo
- React Native
- TypeScript
- React Navigation
- Fetch API

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- H2 Database
- Lombok
- Jakarta Validation

---

## Estrutura

```text
70Graus/
├── App.tsx
├── package.json
├── src/
│   ├── routes/
│   ├── screens/
│   │   ├── auth/
│   │   └── app/
│   ├── services/
│   └── styles/
```

---

## Backend Java

Repositório do backend:

```bash
git clone https://github.com/alex-isidro/70Graus-.git
```

Endpoints utilizados pelo app:

- `/funcionario`
- `/produtos`
- `/estoque`
- `/movi-estoque`

---

## Como executar

### 1) Clonar o app mobile

```bash
git clone https://github.com/KelsonZh0/70Graus.git
cd 70Graus
```

### 2) Subir o backend

```bash
git clone https://github.com/alex-isidro/70Graus-.git
cd 70Graus-
```

Linux / macOS:

```bash
./mvnw spring-boot:run
```

Windows:

```bash
mvnw.cmd spring-boot:run
```

API padrão:

```text
http://localhost:8080
```

### 3) Rodar o app mobile

Volte para a pasta do projeto mobile:

```bash
cd 70Graus
```

Instale as dependências e inicie o Expo:

```bash
npm install
npx expo start
```

Android:

```bash
npm run android
```

iOS:

```bash
npm run ios
```

---

## Configuração da API

No emulador Android, o app usa:

```ts
http://10.0.2.2:8080
```

Se estiver usando dispositivo físico, troque pela URL local da sua máquina:

```ts
http://SEU-IP:8080
```

---

## Diferenciais do projeto

- navegação com stack e bottom tabs
- separação entre telas, rotas, serviços e tema
- integração entre mobile e backend Java
- fluxo CRUD completo
- base sólida para evolução acadêmica e portfólio

---

## Próximos passos

- autenticação com token
- persistência de sessão
- tipagem mais forte na navegação
- melhoria no tratamento de erros
- documentação da API com Swagger
- banco persistente no backend

---

## Autores

- Alexander Isidro
- Kelson Zhang

---

Projeto acadêmico com foco em prática de **desenvolvimento mobile**, **consumo de API** e **integração com backend Java**.
