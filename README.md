# ORBIT

**Your AI. More capable.**

Open-source modular capability platform for ChatGPT with four engines:

- **Flow** — projects, tasks, and research.
- **Dev** — repository inspection, code review, API checks, and error analysis.
- **Studio** — design briefs, website plans, component specifications, and content packs.
- **Automate** — saved workflows built from allowlisted ORBIT actions.

## Status

ORBIT v0.1.0 source package is being published. This is a self-hosted single-tenant release candidate, not a hosted multi-tenant SaaS. OAuth identity, tenant isolation, and embedded MCP Apps UI are future milestones.

## Stack

- Node.js + TypeScript
- Model Context Protocol (MCP) over Streamable HTTP
- React + Vite dashboard
- PostgreSQL
- Docker deployment support

## Quick start

Requirements: Node.js 22+, npm, PostgreSQL 15+.

```powershell
Copy-Item .env.example .env
# Edit DATABASE_URL and set ORBIT_API_TOKEN to a random secret
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Dashboard: http://localhost:5173  
Health: http://localhost:8787/health  
MCP endpoint: http://localhost:8787/mcp

ChatGPT needs a publicly reachable HTTPS MCP endpoint. Do not expose an unauthenticated production server. See [ChatGPT setup](docs/CHATGPT-SETUP.md).

## Documentation

- [Installation and full guide](docs/INSTALLATION.md)
- [ChatGPT connection](docs/CHATGPT-SETUP.md)
- [Operations](docs/OPERATIONS.md)
- [Security policy](SECURITY.md)
- [Contributing](CONTRIBUTING.md)
- [Roadmap](ROADMAP.md)

## License

MIT