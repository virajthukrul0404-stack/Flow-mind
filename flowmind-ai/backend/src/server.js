const http = require("http");

const host = "0.0.0.0";
const port = Number(process.env.PORT || 8080);
const startedAt = new Date();

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function buildBasePayload() {
  return {
    service: "flowmind-backend",
    status: "ready",
    uptimeSeconds: Math.floor(process.uptime()),
    startedAt: startedAt.toISOString(),
    environment: process.env.NODE_ENV || "development",
    commit:
      process.env.RAILWAY_GIT_COMMIT_SHA ||
      process.env.VERCEL_GIT_COMMIT_SHA ||
      "local"
  };
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  if (url.pathname === "/health" || url.pathname === "/ready") {
    return sendJson(response, 200, {
      ...buildBasePayload(),
      healthcheck: "ok"
    });
  }

  if (url.pathname === "/") {
    return sendJson(response, 200, {
      ...buildBasePayload(),
      message:
        "Standalone backend placeholder. The production app still serves most APIs from the frontend Next.js app."
    });
  }

  return sendJson(response, 404, {
    ...buildBasePayload(),
    status: "not_found",
    path: url.pathname
  });
});

function shutdown(signal) {
  console.log(`Received ${signal}. Shutting down FlowMind backend.`);
  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

if (require.main === module) {
  server.listen(port, host, () => {
    console.log(`FlowMind backend listening on http://${host}:${port}`);
  });
}

module.exports = { server };
