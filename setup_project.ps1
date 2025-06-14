# setup_project.ps1

# Exit on errors
$ErrorActionPreference = "Stop"

Write-Host "🚀 Initializing Maximum Effort Project..." -ForegroundColor Cyan



# Step 4: Initialize MkDocs structure if not exists
if (!(Test-Path "./mkdocs.yml")) {
    Write-Host "[4/6] Initializing MkDocs structure..." -ForegroundColor Green
    mkdocs new .
    # Update mkdocs.yml for Material theme
    $mkdocsYml = @"
site_name: Maximum Effort Docs
theme:
  name: material
nav:
  - Home: index.md
  - Game Mechanics: mechanics.md
  - Historical Context: history.md
  - Tutorials: tutorials.md
  - Play the Game: https://maximum-effort.com
"@
    $mkdocsYml | Out-File -Encoding utf8 mkdocs.yml

    # Create initial docs
    "## Maximum Effort: To-Do Checklist" | Out-File -Encoding utf8 "./docs/index.md"
    "# Game Mechanics" | Out-File -Encoding utf8 "./docs/mechanics.md"
    "# Historical Context" | Out-File -Encoding utf8 "./docs/history.md"
    "# Tutorials" | Out-File -Encoding utf8 "./docs/tutorials.md"
} else {
    Write-Host "[4/6] MkDocs already initialized." -ForegroundColor Yellow
}

# Step 5: Create project directories (game-site and backend)
Write-Host "[5/6] Creating project directories..." -ForegroundColor Green
New-Item -ItemType Directory -Path "./game-site/src","./game-site/public" -Force | Out-Null
New-Item -ItemType Directory -Path "./backend/src","./backend/prisma" -Force | Out-Null

# Step 6: Create .gitignore
Write-Host "[6/6] Creating .gitignore..." -ForegroundColor Green
$gitignoreContent = @"
venv/
site/
node_modules/
dist/
.env
*.pyc
__pycache__/
"@
$gitignoreContent | Out-File -Encoding utf8 .gitignore

Write-Host "✅ Project initialized successfully!" -ForegroundColor Cyan
Write-Host "Activate Python environment anytime:" -ForegroundColor Magenta
Write-Host ".\venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "Start MkDocs server with:" -ForegroundColor Magenta
Write-Host "mkdocs serve" -ForegroundColor White
