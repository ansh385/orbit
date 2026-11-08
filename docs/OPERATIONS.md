# Operations

## Zero-budget hosting

See [Zero-budget deployment](ZERO-BUDGET-DEPLOYMENT.md) for the recommended free-tier hosting combination and its limitations.

## Health

`GET /health` should report application health and database connectivity. Verify it after every deployment.

## Backups

A free database tier is not a substitute for backups. Export important data regularly and store the dump somewhere separate from the database:

```powershell
pg_dump "$env:DATABASE_URL" -Fc -f orbit-backup.dump
```

Restore:

```powershell
pg_restore --clean --if-exists -d "$env:DATABASE_URL" orbit-backup.dump
```

## Zero-budget production caveat

The free hosting combination is for development, demos, and low-traffic experiments. Free web services can sleep, restart, or be suspended when quotas are exhausted. Free database quotas can suspend compute when exhausted. There is no uptime SLA, and free-tier policies can change. Do not promise production availability.

## Security checklist

- HTTPS enforced at the edge.
- Unique high-entropy secrets stored in the host's environment settings.
- Never commit `.env` or database credentials.
- Database access restricted to the application.
- Per-user authorization and tenant isolation required before public multi-user use.
- Infrastructure egress rules block private and cloud metadata ranges.
- Dependency updates and security review.
- No secrets in logs or Git.
- Never expose the single-owner v0.1.0 bearer token to public users.
