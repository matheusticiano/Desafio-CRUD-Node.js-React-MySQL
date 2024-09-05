# Gerenciamento de tarefas

Sistema desenvolvido para criar e gerenciar tarefas

## Tecnologias Utilizadas

### Node.js

Runtime JavaScript back-end

### MySQL

SGBD relacional para persistência dos dados da API

### Docker

Ferramenta de gestão de containers para execução padronizada de ambientes computacionais

### React

Biblioteca JavaScript para criação da interface do usuário

### Jest

Framework de testes para JavaScript

## Arquitetura

Aplicação desenvolvida em 3 camadas:

- API Rest que manipula operações de gerenciamento de usuários e tarefas e outros HTTP
- Banco de dados para persistência das operações realizadas na API
- Frontend: interface de usuário desenvolvida com React para gerenciar tarefas e interações.

### Autenticação

A autenticação é realizada atráves de token JWT

### Variáveis de Ambiente

O sistema utiliza variáveis de ambiente para definir credenciais e configurações com base no ambiente em que ela será executada (produção, desenvolvimento, testes, etc.).

## Design

O sistema foi desenvolvido utilizando diversos componentes de design

### Controllers

Manipulação de requisições HTTP

### User

Responsável por manipular tarefas no sistema

- Usuário convencional: pode gerenciar alocações e manipulacões de tarefas para si mesmo

### Criar Usuário

Qualquer pessoa pode criar um usuário

### Login

Deve gerar um token JWT para que o usuário consiga autenticar na API

### Logout

Deve limpar os cookies e storage local

### Criar Tarefa

Permitida apenas para usuários autenticados

### Atualizar Tarefa

Permitida apenas para usuários autenticados, atualizando apenas as tarefas criadas por ele mesmo

### Remover Tarefa

Permitida apenas para usuários autenticados, removendo apenas as tarefas criadas por ele mesmo

### Ver Tarefas

Permitida para qualquer tipo de usuário autenticado, listando apenas as tarefas criadas por ele mesmo

## Como executar o projeto

### Requisitos

- Docker
- Docker Compose

### Passos

- Executar o comando

```
docker compose up
```

<small> O comando acima irá executar o arquivo docker-compose.yaml contendo a API , Banco de Dados e o Client do React, executando as migrations e disponibilizando o Cliente na [URL](http://localhost:) e a API na [URL](http://localhost:8800/api) </small>

### Documentação

A documentação da API pode ser acessada pela [URL](https://documenter.getpostman.com/view/27491960/2sAXjKbYAc)
