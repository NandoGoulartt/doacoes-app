# Sistema de Doações

Este é um sistema de doações desenvolvido com Next.js 14, Prisma, PostgreSQL e API Routes.

## Funcionalidades

- Cadastro e login de usuários (doadores e instituições)
- Criação e listagem de campanhas de doação
- Realização de doações
- Dashboard personalizado por tipo de usuário
- Filtros de busca por localização e data

## Tecnologias

- Next.js 14 (App Router)
- Prisma (ORM)
- PostgreSQL
- Tailwind CSS
- JWT para autenticação
- Zod para validação

## Configuração

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd doacoes-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
- Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/doacoes_db"
JWT_SECRET="seu-segredo-aqui"
```
- Crie o banco de dados PostgreSQL:
```bash
createdb doacoes_db
```
- Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

- `/src/app/api` - Rotas da API
- `/src/app/(pages)` - Páginas da aplicação
- `/src/components` - Componentes reutilizáveis
- `/src/lib` - Utilitários e validações
- `/prisma` - Schema e migrações do banco de dados

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login de usuário

### Campanhas
- `GET /api/campanhas` - Lista campanhas com filtros
- `POST /api/campanhas` - Cria nova campanha (requer autenticação como instituição)
- `GET /api/campanhas/[id]` - Detalhes da campanha

### Doações
- `GET /api/doacoes` - Lista doações do usuário
- `POST /api/doacoes` - Cria nova doação (requer autenticação como doador)

## Licença

MIT

## Deploy na Vercel com Prisma e PostgreSQL

### 1. Configure o banco de dados
- Crie um banco PostgreSQL (pode ser Neon, Supabase, Railway, Vercel Postgres, etc).
- Copie a connection string (exemplo: `postgresql://usuario:senha@host:5432/banco?sslmode=require`).

### 2. Configure as variáveis de ambiente na Vercel
- No painel do projeto na Vercel, vá em **Settings > Environment Variables**.
- Adicione:
  - `DATABASE_URL` com a connection string do banco
  - `JWT_SECRET` com uma string segura

### 3. Deploy do projeto
- Faça o deploy normalmente pela Vercel (conectando o repositório).
- O comando de build já está configurado para `prisma generate && next build`.

### 4. Rode as migrations manualmente
> **Importante:** Não coloque `prisma migrate deploy` no comando de build!

Após o deploy, rode localmente:

```bash
npx prisma migrate deploy
```

- Use a mesma `DATABASE_URL` configurada na Vercel (você pode copiar do painel de variáveis de ambiente).
- Isso irá criar/atualizar as tabelas no banco de produção.

### 5. Novas migrations
- Sempre que criar/alterar migrations, rode novamente:

```bash
npx prisma migrate deploy
```

### 6. Dicas
- Nunca coloque a connection string diretamente no código, sempre use variáveis de ambiente.
- Use sempre `?sslmode=require` no final da connection string para produção.
- Se quiser automatizar, use um workflow de CI/CD para rodar as migrations após o deploy (não no build).

---

Se precisar de exemplos para integração com Neon, Supabase, Railway ou Vercel Postgres, consulte a documentação oficial ou peça ajuda aqui!
