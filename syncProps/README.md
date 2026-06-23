# syncProps

Rebuilds `web/properties.json` from RE/MAX CSV exports.

## Run (every Monday)

```bash
node syncProps/syncProperties.js
```

This fetches all 10 CSV endpoints and writes `web/properties.json`.

## Test with local files

Place CSV files at the repo root (`export1.csv`, `export2.csv`, etc.) then:

```bash
node syncProps/syncProperties.js --local
```

## After syncing

Commit and deploy:

```bash
git add web/properties.json
git commit -m "chore: sync properties"
git push
```

Netlify will redeploy automatically.
