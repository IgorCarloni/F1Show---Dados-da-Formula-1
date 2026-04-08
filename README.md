# 🏎️ F1 Show

Aplicação web em React que exibe dados em tempo real da Fórmula 1, consumindo a API pública [Ergast Developer API](http://ergast.com/mrd/).

---

## 🚀 Demo

> Acesse em produção: **[https://f1show.vercel.app](https://f1show.vercel.app)** *(após deploy)*

---

## 📸 Páginas

| Página | Rota | Descrição |
|---|---|---|
| Home | `/` | Resumo da última corrida, vencedor e pódio |
| Resultados | `/results` | Tabela completa com todos os pilotos |
| Piloto | `/driver/:driverId` | Estatísticas e histórico do piloto na temporada |

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev/) | 18 | Biblioteca de UI |
| [React Router DOM](https://reactrouter.com/) | 6 | Roteamento SPA com rotas dinâmicas |
| [Vite](https://vitejs.dev/) | 4 | Bundler e servidor de desenvolvimento |
| [Ergast API](http://ergast.com/mrd/) | — | Dados da Fórmula 1 |

---

## 🏗️ Arquitetura da Aplicação

```
F1Show/
├── public/
│   └── f1-icon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navegação global
│   │   ├── Navbar.css
│   │   └── States.jsx        # Componentes Loading e ErrorMsg
│   ├── hooks/
│   │   └── useF1Data.js      # Custom hooks para chamadas à API
│   ├── pages/
│   │   ├── Home.jsx          # Rota: /
│   │   ├── Home.css
│   │   ├── Results.jsx       # Rota: /results
│   │   ├── Results.css
│   │   ├── DriverDetail.jsx  # Rota: /driver/:driverId  ← rota dinâmica
│   │   ├── DriverDetail.css
│   │   └── NotFound.jsx      # Rota: *
│   ├── App.jsx               # Definição das rotas
│   ├── main.jsx              # Entry point
│   └── index.css             # Estilos globais
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

### Fluxo de dados

```
Ergast API (HTTP)
      │
      ▼
useF1Data.js (custom hooks)
      │
      ├──► Home.jsx        → exibe resumo + pódio
      ├──► Results.jsx     → tabela completa
      └──► DriverDetail.jsx → estatísticas do piloto
```

### Roteamento

```
BrowserRouter
└── Routes
    ├── /                    → <Home />
    ├── /results             → <Results />
    ├── /driver/:driverId    → <DriverDetail />   ← dinâmica
    └── *                    → <NotFound />
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/f1show.git
cd f1show

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

### Build para produção

```bash
npm run build
npm run preview   # testar o build localmente
```

---

## ☁️ Deploy

### Vercel (recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Faça upload da pasta dist/ no painel do Netlify
# ou conecte o repositório GitHub
```

---

## 🌐 API utilizada

**Ergast Developer API** — `http://ergast.com/api/f1`

| Endpoint | Uso |
|---|---|
| `/current/last/results.json` | Resultado da última corrida |
| `/current/drivers/{id}/results.json` | Histórico do piloto na temporada |

---

## 📄 Licença

MIT © F1 Show
