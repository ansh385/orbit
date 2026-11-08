# Connect ORBIT to ChatGPT

ORBIT exposes an MCP Streamable HTTP endpoint at `/mcp`.

## Requirements

- A deployed ORBIT server reachable through public HTTPS.
- A strong ORBIT_API_TOKEN.
- A ChatGPT plan/workspace where custom MCP apps or connectors are available.

## Steps

1. Deploy ORBIT and confirm `https://YOUR_HOST/health` responds successfully.
2. Configure `ORBIT_API_TOKEN` on the server.
3. In ChatGPT, open Settings and locate Apps / custom MCP connector or developer settings available to your account.
4. Add the MCP server URL: `https://YOUR_HOST/mcp`.
5. Configure authentication compatible with the connector. ORBIT v0.1.0 expects `Authorization: Bearer <ORBIT_API_TOKEN>`.
6. Enable the app and test by asking ChatGPT to list ORBIT projects.

## Important

If your ChatGPT connector flow cannot provide the bearer token expected by ORBIT, do not expose the service without authentication. Add an OAuth-capable authorization proxy/server first. Availability of custom connectors and developer mode depends on plan and workspace policy.

This release uses a single configured owner identity, not per-user OAuth identity or tenant isolation. Do not share one deployment token with unrelated users.
