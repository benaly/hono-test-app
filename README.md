# hono-test-app

Minimal Hono + TypeScript app used to validate the CI/CD pipeline (GitHub Actions → GCP Cloud Run) defined in `~/.claude/stacks/CICD.md`.

## Local development

```bash
npm install
npm run dev        # http://localhost:8080
```

## Available scripts

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run test        # Vitest
npm run build       # compile to dist/ (excludes tests)
npm run start       # run compiled dist/index.js
```

## Endpoints

- `GET /` — basic status message
- `GET /health` — health check (status + timestamp)

## CI/CD setup checklist

1. Push this repo to GitHub.
2. Run the GCP setup steps from `CICD.md` (sections 1-4):
   - Enable APIs
   - Create Artifact Registry repo named `hono-test-app`
   - Create `github-deployer` service account with `run.admin`, `artifactregistry.writer`, `iam.serviceAccountUser`
   - Set up Workload Identity Federation for this repo
3. Add GitHub Secrets:
   - `GCP_PROJECT_ID`
   - `GCP_WIF_PROVIDER`
   - `GCP_SERVICE_ACCOUNT`
4. Create GitHub Environments: `staging` (no protection) and `production` (required reviewer).
5. Open a PR → `ci.yml` should run lint/typecheck/test automatically.
6. Merge to `main` → `deploy.yml` deploys to `hono-test-app-staging` on Cloud Run.
7. Manually trigger `deploy.yml` with `environment: production` to deploy to prod.

## Region

Default region is `europe-west1`. Change in `.github/workflows/deploy.yml` (`REGION` env var) and in the Artifact Registry repo creation command if needed.
