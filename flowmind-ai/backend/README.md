# FlowMind Backend

This backend is prepared for a standalone Railway deployment.

## What is here

- `Dockerfile`: Railway will use this to build the backend container.
- `src/server.js`: minimal Node server that binds to Railway's `PORT`.
- `GET /health`: healthcheck route for Railway.
- `GET /ready`: secondary readiness route.

## Railway deployment

Deploy this folder as its own service from the monorepo.

### Recommended service settings

- Root Directory: `/flowmind-ai/backend`
- Healthcheck Path: `/health`
- Start Command: leave empty when using the Dockerfile

### Why this works

- Railway uses a `Dockerfile` found at the root of the source directory.
- Railway sends traffic and healthchecks to the injected `PORT` value.
- The server listens on `0.0.0.0`, which is required for container platforms.

## Notes

The current product still runs mainly from `../frontend`, where the full Next.js app and its API routes live. This backend is a clean starting point for moving standalone APIs onto Railway without blocking the frontend deploy.
