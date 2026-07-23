# Golden Raspberry Awards

Repositório com os dois testes técnicos — uma API backend e uma interface frontend — em torno dos dados de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

## [`backend/`](backend/)

API RESTful (Node.js + TypeScript + Express) que lê o CSV oficial dos filmes na inicialização,
carrega os dados num banco embarcado em memória (SQLite) e expõe o produtor com maior e menor
intervalo entre prêmios consecutivos. Instruções completas em [backend/README.md](backend/README.md).

## [`frontend/`](frontend/)

Interface (React + TypeScript + Vite) com Dashboard e Lista de Filmes, paginação e filtros —
consumindo a API pública do desafio (`https://challenge.outsera.tech/api`), não a API do `backend/`
deste repositório. São dois entregáveis independentes. Instruções completas em
[frontend/README.md](frontend/README.md).
