# Golden Raspberry Awards API

API RESTful (Richardson nível 2) que lê um CSV de filmes na inicialização, carrega os dados em um
banco embarcado em memória (SQLite via `better-sqlite3`, equivalente ao H2) e expõe o produtor com maior e menor intervalo entre prêmios consecutivos de Pior Filme.

## Pré-requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

## Instalar

```bash
npm install
```

## Rodar em modo desenvolvimento

```bash
npm run dev
```

Sobe o servidor com hot-reload (via `tsx watch`) na porta `3000` (ou `PORT` do ambiente).

O CSV é resolvido nesta ordem de prioridade:

1. Argumento de linha de comando: `npm run dev -- --csv ./caminho/para/arquivo.csv`
2. Conteúdo recebido via stdin (pipe): `cat arquivo.csv | npm run dev`
3. Fallback: `./data/Movielist.csv` (dataset oficial do desafio)

## Endpoints

```bash
GET /health
```

```json
{ "status": "ok" }
```

```bash
GET /producers/interval
```

```json
{
  "min": [{ "producer": "Joel Silver", "interval": 1, "previousWin": 1990, "followingWin": 1991 }],
  "max": [
    { "producer": "Matthew Vaughn", "interval": 13, "previousWin": 2002, "followingWin": 2015 }
  ]
}
```

## Build

```bash
npm run build
```

Compila o TypeScript para `dist/`.

## Rodar em produção

```bash
npm run build
npm start
```

## Rodar os testes de integração

```bash
npm test
```

Executa os testes de integração (Vitest + Supertest) contra a instância do Express exportada em
`src/server.ts`, carregando o CSV real antes de bater nos endpoints. Não há testes unitários neste
projeto — apenas testes de integração, conforme os requisitos do desafio.

## Lint / format

```bash
npm run lint
npm run format
```

## Estrutura

```
src/
  server.ts                 // cria e configura a app express
  index.ts                  // entrypoint: resolve o CSV e sobe o servidor
  config/database.ts        // conexão better-sqlite3 (:memory:) + schema
  loaders/csvLoader.ts       // parsing do CSV -> repository
  repositories/               // acesso a dados (SQLite <-> modelo de domínio)
  services/                   // regras de negócio (cálculo do intervalo)
  controllers/                 // handlers HTTP
  routes/                     // definição das rotas
  types/                       // um tipo por arquivo (movie, producerInterval, ...)
data/Movielist.csv            // dataset oficial (fallback)
tests/                        // testes de integração
```
