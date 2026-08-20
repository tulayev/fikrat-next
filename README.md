# Fikrat

## Project layout

- `src/Fikrat.Client` — Next.js frontend (Pages Router)
- `src/Fikrat.Api` — .NET 10 Minimal API backend

## Running the app locally

### Quick start

From the repo root:

```powershell
./dev.ps1
```

This starts both the API (`http://localhost:5000`) and the frontend (`http://localhost:3000`), streaming their logs with `[api]`/`[client]` prefixes. Press `Ctrl+C` to stop both.

### Manual / two-terminal fallback

Terminal 1 — API:

```powershell
cd src/Fikrat.Api
dotnet run
```

API runs at `http://localhost:5000`. Health check: `GET /health`. OpenAPI document (Development only): `GET /openapi/v1.json`.

Terminal 2 — frontend:

```powershell
cd src/Fikrat.Client
npm run dev
```

Frontend runs at `http://localhost:3000`.

### Notes

- CORS on the API only allows the `http://localhost:3000`, `https://localhost:3000`, and `http://localhost:3001` origins. If the frontend runs on a different port, add it to the `FrontendCorsPolicy` in `src/Fikrat.Api/Program.cs`.
- Auth is bearer-token based (`Authorization: Bearer <token>`, sent by the frontend's axios client), not cookie-based, so CORS does not need `AllowCredentials`.
- The sample `Courses` endpoints (`/api/v1/courses`) are in-memory placeholders — data resets whenever the API restarts.
