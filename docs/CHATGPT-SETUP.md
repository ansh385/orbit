# Use ORBIT from ChatGPT

ORBIT is designed so that ChatGPT is the primary user interface. You should be able to ask ChatGPT to use Flow, Dev, Studio, and Automate tools without opening the optional ORBIT dashboard for everyday work.

## What runs where?

- **ChatGPT:** conversation, reasoning, and deciding when to call tools.
- **ORBIT remote MCP server:** exposes ORBIT's capabilities over HTTPS.
- **PostgreSQL:** stores ORBIT projects, tasks, research, briefs, workflows, and execution records.
- **Optional dashboard:** administration/demo interface only; it is not required for normal ChatGPT use.

ChatGPT does not host the ORBIT backend or database. A remote MCP server and database must be hosted separately. The core ORBIT tools do not require a separate paid model API key.

## Compatibility comes first

Custom remote MCP apps/connectors, developer-mode access, and write actions depend on the current ChatGPT plan, client, and workspace policy. ORBIT cannot bypass plan restrictions.

Before deploying, check the current OpenAI help documentation:
- [Developer mode](https://help.openai.com/en/articles/12584461-developer-mode)
- [Apps in ChatGPT](https://help.openai.com/en/articles/11487775-connectors-in-chatgpt)

Do not assume that a ChatGPT Go account can add a custom remote MCP server with write access. If the account UI does not offer the required custom MCP connection, the integration cannot be tested from that account. Do not upgrade or pay solely based on this repository's claims.

## Current ORBIT authentication limitation

The current v0.1.x server uses a configured static bearer token. It does not implement OAuth 2.1, per-user identity, or tenant isolation. ChatGPT connection flows may require OAuth or a different supported authentication method. **Do not disable authentication or expose the server publicly to work around this.**

A compatible ChatGPT account is necessary but not sufficient: the authentication flow must also match what the client supports. OAuth 2.1 and multi-user authorization remain release gates.

## Connection checklist (only after compatibility and auth are verified)

1. Deploy ORBIT to a public HTTPS endpoint.
2. Configure a strong secret and a PostgreSQL connection string in the host's secret/environment settings.
3. Apply database migrations using the documented deployment process.
4. Verify `GET /health` reports a connected database.
5. Configure the ChatGPT custom remote MCP connection using the deployed `/mcp` endpoint and the authentication method actually supported by both sides.
6. Start with read-only calls. Test write tools only against disposable test data.
7. Verify that created records persist and cannot be read by another user.

The steps above are a release checklist, not a claim that a live ChatGPT connection has already passed.

## What a successful ChatGPT session should look like

After a compatible connection is configured, ask ChatGPT to:
- list ORBIT Flow projects;
- create a disposable test project and task;
- run a Dev code review against a short sample;
- ask Studio to plan a small website;
- validate an Automate workflow before executing it.

Confirm results by reading them back through ORBIT. Do not mark an engine verified merely because its tool appears in the client.
