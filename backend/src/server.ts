import express from "express";
import type { Express } from "express";

import routes from "./routes";

export function createServer(): Express {
  const app = express();

  app.use(express.json());
  app.use(routes);

  return app;
}

export const app = createServer();
