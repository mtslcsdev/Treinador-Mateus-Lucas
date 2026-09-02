# Frontend - Treinador Mateus Lucas

React app com Vite para o painel de treinador.

## 📦 Instalação

```bash
npm install
```

## 🚀 Desenvolvimento

```bash
npm run dev
```

App estará disponível em `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

Saída estática em `dist/`

## 📁 Estrutura

```
src/
├── components/       # Componentes React
├── pages/           # Páginas (rotas)
├── services/        # Serviços (API, Auth)
├── contexts/        # Context API
├── types/           # TypeScript types
├── App.tsx
└── main.tsx
```

## 🔐 Autenticação

Supabase Auth integrado. Configure `VITE_SUPABASE_*` em `.env.local`

## 🎨 Design System

Usando design tokens da pasta `_ds/`
