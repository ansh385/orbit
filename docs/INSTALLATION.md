# Installation guide

## Windows 11

1. Install Node.js 22 or newer, Git, and PostgreSQL 15 or newer.
2. Create a database and dedicated user:

```sql
CREATE USER orbit WITH PASSWORD 'use-a-strong-unique-password';
CREATE DATABASE orbit OWNER orbit;
```

3. Clone the repository:

```powershell
git clone https://github.com/ansh385/orbit.git
cd orbit
```

4. Copy the environment template and edit it:

```powershell
Copy-Item .env.example .env
notepad .env
```

Set DATABASE_URL and ORBIT_API_TOKEN. Use a long random token. Never commit .env.

5. Install, migrate, seed, and run:

```powershell
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

## Verify

- Dashboard: http://localhost:5173
- Health endpoint: http://localhost:8787/health
- MCP endpoint: http://localhost:8787/mcp

## Production

Deploy behind HTTPS, use a managed PostgreSQL instance, configure secrets in the host's secret manager, and run database migrations during release. v0.1.0 is single-tenant: run isolated instances for separate users. Do not disable authentication to work around ChatGPT connector auth limitations.
