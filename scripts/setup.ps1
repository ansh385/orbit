$ErrorActionPreference = "Stop"
if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env. Edit DATABASE_URL and ORBIT_API_TOKEN before continuing."
} else {
  Write-Host ".env already exists; leaving it unchanged."
}
npm install
Write-Host "Dependencies installed. Next: npm run db:migrate; npm run db:seed; npm run dev"
