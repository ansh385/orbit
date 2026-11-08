# Connect ORBIT to ChatGPT

ORBIT is intended to be used from ChatGPT through a remotely hosted MCP server. Users should not need to install PostgreSQL, Node.js, or the ORBIT dashboard on their own computers when using the hosted version.

## Requirements

- An ORBIT server deployed at a public HTTPS URL.
- A strong server secret configured outside Git.
- A ChatGPT plan/workspace that supports custom MCP apps or connectors.
- A tested MCP transport and authentication flow.

## Current v0.1.0 limitations

- The server currently expects `Authorization: Bearer <ORBIT_API_TOKEN>`.
- This is a single-owner token model, not OAuth 2.1.
- It does not provide per-user identity or multi-tenant data isolation.
- Do not distribute one shared bearer token to unrelated users.
- A public hosted multi-user ChatGPT integration is not ready until OAuth, account isolation, and authorization are implemented and security-tested.

## Intended connection steps (after deployment)

1. Deploy the server using the [zero-budget deployment guide](ZERO-BUDGET-DEPLOYMENT.md).
2. Confirm `https://YOUR_HOST/health` responds successfully.
3. Confirm the MCP endpoint is reachable at `https://YOUR_HOST/mcp`.
4. In a ChatGPT account/workspace that supports custom MCP connections, add the remote MCP server using the HTTPS endpoint and the authentication method supported by that ChatGPT connection flow.
5. Test a read-only tool first, then test write tools only in a disposable test account/database.

Do not assume ChatGPT can send ORBIT's static bearer token in its connector flow. If the selected ChatGPT flow requires OAuth, an OAuth 2.1 authorization server must be implemented first. Never disable authentication to make a connection appear to work.

## ChatGPT plan availability

Custom MCP app availability and write permissions depend on the ChatGPT plan and workspace settings. ORBIT cannot bypass those product restrictions. A free ORBIT hosting tier does not imply that every ChatGPT account can connect a custom MCP server.
