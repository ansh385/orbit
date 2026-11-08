# Operations

## Health

`GET /health` reports application and PostgreSQL connectivity.

## Backups

Use pg_dump regularly and store backups outside the application host:

```powershell
pg_dump "$env:DATABASE_URL" -Fc -f orbit-backup.dump
```

Restore:

```powershell
pg_restore --clean --if-exists -d "$env:DATABASE_URL" orbit-backup.dump
```

## Production checklist

- HTTPS enforced at the edge.
- Unique high-entropy API token.
- PostgreSQL on private networking with backups.
- Secrets managed by hosting provider.
- One isolated instance per user/customer in v0.1.0.
- Infrastructure egress rules block private and cloud metadata ranges.
- Dependency updates and security review.
- No secrets in logs or Git.
