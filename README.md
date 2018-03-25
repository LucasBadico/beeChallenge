# beeChallenge
A small challenge proposed by beeTech team.

## Stack
- Backend
  - koa2
  - rethinkdb
  - graphql
  - jest

- Frontend
  - react
  - graphql
  - react-maps
  - enzyme
  - jest

- Helpers
  - ramda, back & front
  - elemental-ui, front

## Proposta de Desenvolvimento
O documento do desafio propoe uma ui simples, apenas relacionando DDD a custos e capturando leads. O plano é entregar isso junto com a infra até sexta e dai iterar nessa base para ter algo com cara de produto.

Separei o projeto em 5 fases:

### 1 - Basica
  Um serviço que retorne o custo de ligação de diferente planos entre diferentes regiões.
  Uma UI que exponha esses custos e capture leads, nome, email e telefone, se é ou não cliente.

### 2 - Iteração Web
  UI fazer com que tudo fique visual. Relacionar o DDD a regiao geografica e mostrar isso no mapa, uberlike.
  Deixar a UI sexy como o pipefy.

### 3 - Mobile
  Replicação da versão web em um app nativo.

### 4 - Iteração Mobile
 Que reconheça se o aparelho é da operadora. Captura o lead se nao for e liga direto da interface.

### 5 - Iteração zoom
  A bee fez uma parceria com a zoom e agora oferece ligacoes via seu app com o serviço do zoom 

## Entregas
- 1 - Basica, Scopo original, com o minimo de funcionamento necessário.
  previsão 1: sexta a noite.
  previsão 2: domingo pela manhã?
- 2 - Iteração Web, Adição de features na versão web.
  previsão 1: sabado a noite.
  previsão 2: domingo a noite.
- 3 - Mobile, Versão mobile, com as mesmas funcionalidades do web.
  previsão: segunda pela manhã.
- 4 - Iteração Mobile, Adição de features especificas da versão mobile.
  previsão: segunda a noite.
- 5 - Iteração Zoom, add integração do zoom ao projeto.

## Changelog


## Arquitetura
- microservices
  - autenticação
  - custo ddd
  - captura de lead
  - ddd to geolocalização
  - graphql exposition
  - hostedNumbers