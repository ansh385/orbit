# Contributing

1. Fork the repository.
2. Create a feature branch.
3. Install dependencies and run typecheck, tests, and build.
4. Add tests for behavior changes.
5. Keep engine logic inside its package boundary.
6. Never commit secrets, personal data, or real credentials.
7. Open a pull request with a clear problem statement and test evidence.

All external input must be validated. Use parameterized SQL. Do not add arbitrary command execution. Keep outbound API requests behind SSRF protections. Never return stack traces or secrets to clients.
