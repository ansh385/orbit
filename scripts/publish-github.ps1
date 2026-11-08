$ErrorActionPreference = "Stop"
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI is required. Install it from https://cli.github.com/ and reopen PowerShell."
}
gh auth status
if ($LASTEXITCODE -ne 0) { throw "GitHub CLI is not authenticated. Run: gh auth login" }
if (-not (Test-Path ".git")) { git init }
git add .
git status --short
$answer = Read-Host "Create the public GitHub repository 'orbit' and push this source? (yes/no)"
if ($answer -ne "yes") { Write-Host "Cancelled."; exit 0 }
git commit -m "chore: initialize ORBIT v0.1.0"
if ($LASTEXITCODE -ne 0) { throw "Resolve the Git commit issue, then rerun this script." }
gh repo create orbit --public --source . --remote origin --push --description "Open-source modular capability hub for ChatGPT: Flow, Dev, Studio and Automate."
if ($LASTEXITCODE -ne 0) { throw "GitHub repository creation or push failed." }
Write-Host "Published: https://github.com/$(gh api user --jq .login)/orbit"
