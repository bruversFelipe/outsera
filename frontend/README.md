# Golden Raspberry Awards — Frontend

Interface (React + TypeScript + Vite) com duas telas — Dashboard (4 painéis) e Lista de Filmes
(tabela paginada com filtros) — consumindo a API pública dos Golden Raspberry Awards.

## Pré-requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

## Instalar

```bash
npm install
```

Copie `.env.example` para `.env` e ajuste `VITE_API_URL` se precisar (default:
`https://challenge.outsera.tech/api`).

## Rodar

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Testes

```bash
npm test
```

Vitest + Testing Library, em dois níveis (`src/tests/`):

- **`unit/`** — hooks e componentes isolados, mockando a dependência imediata (um service, por exemplo).
- **`integration/`** — cada container renderizado por inteiro; só a chamada HTTP (`services/api.ts`)
  é mockada, o resto (service → hook → componentes) roda de verdade.

## Lint / format

```bash
npm run lint
npm run format
```

## Estrutura

```
src/
  main.tsx, App.tsx      bootstrap, ThemeProvider, layout
  theme.ts, styled.d.ts   tema do styled-components (cores, tipado)
  routes/                 rotas (/dashboard, /movies), lazy-loaded
  pages/                  uma página por rota, delega pro container
  containers/              telas com estado e regra de negócio
    Dashboard/                4 painéis + hook de dados
    ListMovies/               tabela + filtros + paginação
  components/             UI reutilizável (Table, Pagination, Button, Input, Select, Card, Tag, Loading, Menu)
  services/                uma função por endpoint da API
  utils/                   helpers (colunas de tabela, mensagem de erro)
  types/                   interfaces compartilhadas
  tests/                   unit/ e integration/
```
