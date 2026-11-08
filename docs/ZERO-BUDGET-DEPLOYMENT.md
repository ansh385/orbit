# Zero-budget deployment (₹0 target)

ORBIT's deployment target is **₹0/month using free tiers**, with no paid API required. Free-tier availability, quotas, and provider policies can change. This is a hobby/demo deployment target, not a production uptime guarantee.

## Recommended free-tier combination

| Component | Free option | Important limits |
|---|---|---|
| Source and CI | GitHub public repository + GitHub Actions | Subject to GitHub's free usage allowances |
| Node.js MCP server | Render Free Web Service | Spins down after 15 minutes idle; cold start can take about a minute; 750 free instance hours/workspace/month |
| PostgreSQL | Neon Free | 1 GB storage/project, 100 compute-hours/project/month, 5 GB network transfer/project/month |
| TLS | Render-managed HTTPS | Use the generated `.onrender.com` hostname to avoid buying a domain |
| AI model calls | None required by ORBIT core | Use ChatGPT as the model interface; do not add a paid OpenAI API dependency |

Official limits:
- [Render free services](https://render.com/docs/free)
- [Neon free plan quotas](https://neon.com/docs/introduction/pro-plan)

## Why not Render's free PostgreSQL?

Render's free PostgreSQL databases expire after 30 days and do not include backups. Use Neon Free for the persistent database instead. Render's free web service is still suitable for a low-traffic demo, but it sleeps when idle and may be slow to wake.

## Deployment outline

1. Create a free Neon project and copy its pooled or direct PostgreSQL connection string. Keep the password private.
2. Create a free Render Web Service connected to this GitHub repository.
3. Set the service's build/start commands to the commands defined by the repository's actual package scripts. Do not guess these values; verify them from `package.json` after the application source is published.
4. Add environment variables in Render's dashboard:
   - `DATABASE_URL`: Neon connection string
   - `ORBIT_API_TOKEN`: a newly generated long random secret for the current single-owner release
   - `NODE_ENV=production`
   - `PORT`: let Render provide its assigned port if the server supports it
5. Run database migrations against Neon using the documented migration command.
6. Confirm the HTTPS `/health` endpoint, then test `/mcp` with an MCP client.
7. Never commit `.env`, database URLs, API tokens, or OAuth secrets.

## Important product constraints

- ORBIT v0.1.0 is single-owner/token-authenticated. It is **not** safe to offer one shared token to the public or to claim multi-user data isolation.
- ChatGPT custom MCP connection availability depends on the user's ChatGPT plan and workspace policy. Hosting ORBIT for free does not unlock ChatGPT features that the user's plan does not support.
- The current bearer-token authentication is not OAuth 2.1. Do not claim OAuth support or instruct users to configure OAuth until it is implemented and tested.
- A free Render service may sleep and cold-start. Long-lived MCP sessions and strict client timeouts must be tested; if the host cannot reliably support the required MCP transport, the zero-cost deployment is not yet viable.
- Free tiers can change or suspend service when quotas are exhausted. Monitor usage and keep database exports. Do not add a payment method if the hard ₹0 budget is non-negotiable.

## Local development

A local PostgreSQL/Docker setup is optional for contributors. It is not a requirement for end users of the intended hosted ChatGPT experience. Contributors can use a free Neon development database instead, but should create their own isolated project and credentials.

## Honest status

This document defines the zero-budget deployment plan. It does not mean ORBIT has already been deployed, passed hosted MCP tests, gained OAuth, or become a public multi-user ChatGPT app. Those remain release gates.
