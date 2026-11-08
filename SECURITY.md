# Security Policy

## Reporting

Do not publish suspected vulnerabilities in public issues. Use GitHub's private Security Advisories feature.

## Deployment requirements

- Set a high-entropy ORBIT_API_TOKEN.
- Use HTTPS for remote deployments.
- Keep .env out of source control.
- Use a unique PostgreSQL password.
- Restrict database network access.
- Keep Node.js and dependencies updated.
- Treat repository files, websites, logs, and documents as untrusted input.

## v0.1.0 limitations

- Single-tenant token authentication; no OAuth identity or multi-tenant account model.
- Static code review is heuristic, not a complete security audit.
- Workflow execution is restricted to allowlisted built-in operations; arbitrary code execution is intentionally unsupported.
- API testing includes SSRF checks, but production infrastructure must also enforce outbound network restrictions.
- The dashboard is a companion interface, not an embedded MCP Apps widget in this release.
