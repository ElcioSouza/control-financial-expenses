#  Control Financial Expenses

Aplicativo mobile de controle financeiro desenvolvido com React Native e Expo, permitindo gerenciar receitas e despesas com facilidade.

## Sobre o Projeto

 **Control Financial Expenses** é uma aplicação mobile completa para gestão financeira, onde os usuários podem:

-  Criar conta e fazer login com autenticação segura
-  Registrar receitas e despesas
-  Visualizar saldo total atualizado em tempo real
-  Filtrar movimentações por data usando calendário
-  Excluir registros financeiros
-  Acompanhar histórico de transações

##  Tecnologias Utilizadas

### Core
- **React Native** `0.81.5` - Framework para desenvolvimento mobile
- **Expo** `~54.0.31` - Plataforma para desenvolvimento React Native
- **TypeScript** `~5.9.2` - Superset JavaScript com tipagem estática

### Navegação
- **@react-navigation/native** `^7.1.26` - Navegação entre telas
- **@react-navigation/native-stack** `^7.9.0` - Stack navigator
- **@react-navigation/drawer** `^7.7.10` - Menu lateral (drawer)

### UI e Estilização
- **styled-components** `^6.1.19` - CSS-in-JS para estilização
- **@expo/vector-icons** `^15.0.3` - Biblioteca de ícones
- **react-native-calendars** `^1.1313.0` - Componente de calendário

### Banco de Dados e Armazenamento
- **expo-sqlite** `~16.0.10` - Banco de dados SQLite local
- **@react-native-async-storage/async-storage** `2.2.0` - Armazenamento assíncrono

### Utilitários
- **date-fns** `^4.1.0` - Manipulação de datas
- **expo-crypto** `~15.0.8` - Criptografia (hash de senhas com SHA256)

##  Arquitetura

O projeto segue os princípios da **Clean Architecture** com separação clara de responsabilidades:

### Camadas

1. **Domain (Domínio)**
   - `models/` - Entidades do negócio (User, Receive)
   - `services/` - Regras de negócio puras
   - `repositories/` - Interfaces (contratos)
   - `dto/` - Objetos de transferência de dados

2. **Controllers**
   - Orquestram a comunicação entre UI e Services
   - Tratam erros e retornam respostas padronizadas

3. **Database**
   - Implementação dos repositórios com SQLite
   - Migrations e gerenciamento de conexão

4. **Presentation (UI)**
   - `screen/` - Telas completas
   - `components/` - Componentes reutilizáveis
   - `contexts/` - Gerenciamento de estado global

## Segurança

- **Autenticação**: Sistema próprio com SHA256
- **Senhas**: Hash SHA256 usando `expo-crypto`
- **Sessão**: Dados do usuário armazenados localmente com AsyncStorage
- **Validações**: Entrada validada em múltiplas camadas
- **Mensagens genéricas**: "Email ou senha incorretos" para evitar enumeração de usuários

## Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para emulador Android) ou dispositivo físico
- Xcode (para iOS, apenas macOS)

### Instalação

1. **Clone o repositório**
   git clone url-do-repositorio

2. **Instale as dependências**
npm install

3. **Execute o projeto**

Para Android:
npm run android

Para iOS (macOS apenas):
npm run ios


## 📱 Funcionalidades

### Autenticação
- [x] Cadastro de novo usuário
- [x] Login com email e senha
- [x] Logout
- [x] Persistência de sessão

### Gestão Financeira
- [x] Cadastrar receita
- [x] Cadastrar despesa
- [x] Listar movimentações
- [x] Filtrar por data
- [x] Deletar movimentação
- [x] Visualizar saldo total
- [x] Visualizar total de receitas do dia
- [x] Visualizar total de despesas do dia

### Interface
- [x] Drawer navigation personalizado
- [x] Calendário para seleção de datas
- [x] Cards de saldo/receita/despesa
- [x] Lista de histórico com scroll
- [x] Feedback visual (Alerts)
- [x] Loading states