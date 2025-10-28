# GymBro

Aplicação front-end em React + Vite (TypeScript) para gestão de treinos com integração ao Supabase e um cliente Gemini.

## Visão geral
- Front-end em React + Vite + TypeScript.
- Autenticação e persistência com Supabase.
- Geração/auxílio com modelo Gemini (cliente local/serviço).
- Componentes organizados por responsabilidade (forms, dashboard, modais, generics).

## Estrutura principal (src/)
- App e entrada: `src/main.tsx`, `src/App.tsx`
- Componentes: `src/components/*` (dashboard, formulários, componentes genéricos, modal, header/footer)
- Páginas/layouts: `src/pages/*`
- Supabase: `src/supabase/supabaseClient.ts`, `src/supabase/services/saveWorkout.ts`
- Gemini: `src/gemini/geminiClient.ts`, `src/gemini/generateTrainee.ts`
- Utilitários de rota: `src/utils/privateRoute.tsx`, `src/utils/publicRoute.tsx`

## Requisitos
- Node.js (recomenda-se LTS)
- npm ou yarn

## Instalação e execução (Windows)
1. Instalar dependências:
   npm install
2. Rodar em desenvolvimento:
   npm run dev
3. Build para produção:
   npm run build
4. Prever build localmente:
   npm run preview

## Variáveis de ambiente
Crie um arquivo `.env` na raiz com as variáveis necessárias (exemplos):
- SUPABASE_URL=
- SUPABASE_ANON_KEY=
- GEMINI_API_KEY= (ou conforme usado em `src/gemini/geminiClient.ts`)

## Pontos importantes
- Serviços de persistência e geração de treino:
  - `src/supabase/services/saveWorkout.ts`
  - `src/gemini/generateTrainee.ts`
- Rotas protegidas: `src/utils/privateRoute.tsx`
- Componentes genéricos reutilizáveis em `src/components/generics`

## Desenvolvimento e contribuição
- Seguir convenções TypeScript/React já presentes.
- Abrir PRs pequenos e claros.
- Testar mudanças localmente com `npm run dev`.

## Licença
- MIT (ajuste conforme necessário).
