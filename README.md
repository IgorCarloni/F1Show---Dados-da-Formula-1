# 🏎️ F1 Show

Aplicação web para acompanhar resultados, classificações e estatísticas da Fórmula 1, consumindo a [Ergast Mirror API](https://api.jolpi.ca/ergast/f1).

---

## 📱 Telas

| Tela | Rota | Descrição |
|---|---|---|
| Início | `/` | Banner de boas-vindas, última corrida e pódio |
| Resultados | `/results` | Tabela completa da última corrida |
| Temporadas | `/season` | Seletor de ano + lista de corridas + resultados |
| Classificação | `/standings` | Campeonato de pilotos e construtores por ano |
| Piloto | `/driver/:driverId` | Estatísticas e histórico do piloto na temporada |

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev/) | 18.2+ | Framework de UI |
| [React Router DOM](https://reactrouter.com/) | 6.22+ | Roteamento SPA |
| [Vite](https://vitejs.dev/) | 4.5+ | Bundler e dev server |
| [Ergast Mirror API](https://api.jolpi.ca) | — | Dados da Fórmula 1 |

---

## 🏗️ Arquitetura

```
f1show/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Barra de navegação
│   │   └── States.jsx       # Componentes de Loading e Error
│   ├── hooks/
│   │   └── useF1Data.js     # Custom hooks para consumo da API
│   ├── pages/
│   │   ├── Home.jsx         # Rota: /
│   │   ├── Results.jsx      # Rota: /results
│   │   ├── Season.jsx       # Rota: /season
│   │   ├── Standings.jsx    # Rota: /standings
│   │   ├── DriverDetail.jsx # Rota: /driver/:driverId
│   │   └── NotFound.jsx     # Rota: *
│   ├── App.jsx              # Definição das rotas
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globais
├── index.html
├── vite.config.js
└── package.json
```

### Fluxo de dados

```
Ergast Mirror API (HTTPS)
        │
        ▼
  useF1Data.js (custom hooks)
        │
        ├──► Home          → última corrida + pódio
        ├──► Results       → tabela completa
        ├──► Season        → corridas por ano + resultados
        ├──► Standings     → pilotos + construtores
        └──► DriverDetail  → histórico do piloto
```

> O proxy configurado no `vite.config.js` redireciona `/ergast` para `https://api.jolpi.ca`, evitando problemas de CORS em desenvolvimento.

---

## ⚙️ Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

### Instalar dependências

```bash
npm install
```

### Rodar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build para produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`.

### Pré-visualizar o build

```bash
npm run preview
```

---

## 🌐 API utilizada

**Ergast Mirror API** — `https://api.jolpi.ca/ergast/f1`

| Endpoint | Hook | Uso |
|---|---|---|
| `/current/last/results.json` | `useRaceResults` | Última corrida |
| `/{year}/races.json` | `useSeasonRaces` | Corridas de uma temporada |
| `/{year}/{round}/results.json` | `useRaceResult` | Resultado de uma corrida |
| `/{year}/driverStandings.json` | `useDriverStandings` | Classificação de pilotos |
| `/{year}/constructorStandings.json` | `useConstructorStandings` | Classificação de construtores |
| `/current/drivers/{id}/results.json` | `useDriverHistory` | Histórico do piloto |

---

## 📄 Licença

MIT © F1 Show
