# Gerenciador de Tarefas (Projeto Acadêmico)

Este repositório contém o código-fonte de uma aplicação básica de gerenciamento de tarefas desenvolvida em ReactJS. Este projeto foi criado com o objetivo de demonstrar a proficiência no desenvolvimento de componentes reutilizáveis e no gerenciamento de estado global da aplicação, sendo uma entrega para a disciplina de Linguagem de programação para a Internet.

## Requisitos Implementados

1. Componentização em React: O projeto foi estruturado utilizando a divisão em múltiplos componentes (App, ListaDeTarefas e Tarefa) para promover a reutilização e a clareza do código.
2. Gerenciamento de Estado Global: O estado da aplicação (a lista de tarefas e o filtro atual) é gerenciado globalmente usando a React Context API combinada com o useReducer hook.
3. Adição de Tarefas: Implementação de um formulário de entrada com um botão para adicionar novas tarefas à lista.
4. Marcação de Conclusão: Cada tarefa possui um checkbox que permite ao usuário alternar o status da tarefa entre "pendente" e "concluída".
5. Filtragem de Tarefas: Implementação de controles para filtrar a visualização da lista por status: "Todas", "Concluídas" e "Pendentes".

### Como Rodar o Projeto

Este projeto foi desenvolvido para ser executado em um ambiente Node.js.

1. Instalação das Dependências:

```
npm install
# ou
yarn install
```

2. Início da Aplicação:

```
npm start
# ou
yarn start
```

A aplicação será aberta automaticamente no seu navegador, geralmente em http://localhost:3000/.
