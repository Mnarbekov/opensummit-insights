# OpenSummit Insights Deploy Notes

Date: 2026-07-23

## GitHub
- Repo: https://github.com/Mnarbekov/opensummit-insights
- Local working copy: C:\DataCells\opensummit-insights
- Branch: main
- Deploy model: GitHub Actions auto-deploy using Azure/static-web-apps-deploy@v1
- Workflow: .github\workflows\azure-static-web-apps-opensummit-insights.yml
- App root: /
- API location: empty
- Output location: empty
- Build: skipped (pure static)

## Azure
- Subscription: Visual Studio Enterprise Subscription (n8n)
- Subscription ID: cf6550ec-d002-4ed0-b0df-f48bc54f2849
- Resource group: rg-opensummit-insights
- Region: East Asia
- Static Web App name: opensummit-insights
- SKU: Free
- Default URL: https://salmon-pebble-0da68e600.7.azurestaticapps.net

## Custom domain
- Target hostname: https://opensummitai2026.mikhailnarbekov.com
- Cloudflare CNAME required:
  - Type: CNAME
  - Name: opensummitai2026
  - Target/value: salmon-pebble-0da68e600.7.azurestaticapps.net
  - Proxy status: DNS only / grey cloud (not proxied)
- Status 2026-07-23: pending manual Cloudflare DNS creation. Local Cloudflare API/tool credentials were not available.
- Azure command to run after the CNAME exists:

```powershell
az staticwebapp hostname set -n opensummit-insights -g rg-opensummit-insights --hostname opensummitai2026.mikhailnarbekov.com --validation-method cname-delegation
az staticwebapp hostname show -n opensummit-insights -g rg-opensummit-insights --hostname opensummitai2026.mikhailnarbekov.com -o table
```

Attempted before DNS existed; Azure returned: `CNAME Record is invalid. Please ensure the CNAME record has been created.`

## Redeploy procedure
1. Edit files in `C:\DataCells\opensummit-insights`.
2. Commit changes to `main`.
3. Push to GitHub: `git push origin main`.
4. GitHub Actions deploys automatically to Azure Static Web Apps.
5. Verify: `curl.exe -L -s -o NUL -w "%{http_code}" https://salmon-pebble-0da68e600.7.azurestaticapps.net`.

## Shipped content
Only these site assets are shipped:
- index.html
- style.css
- script.js
- assets\slides\*.JPEG (7 files)

Excluded from the repo/deploy:
- `_selfcheck\`
- `assets\video\`
