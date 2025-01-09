import express, { Application, NextFunction, Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import routes from "./module/index";
import { dbConnect } from "./config/db";

const app: Application = express();

try {
  app.use(express.json());
  app.use(
    cors({
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );

  dbConnect();

  app.use(compression());

  app.use(
    bodyParser.urlencoded({
      extended: false,
      limit: "100mb",
    })
  );

  app.use(
    bodyParser.json({
      limit: "100mb",
    })
  );

  //   API Routes
  app.use(routes);

  // handle unexpected errors
  process.on("unhandledRejection", (error: Error) =>
    console.error("Unhandled Rejection:", error, error.stack)
  );

  process.on("uncaughtException", (error: Error) =>
    console.error("Uncaught Exception:", error, {
      stack: error.stack,
      origin,
    })
  );
} catch (error: any) {
  console.error(error.message, error);
  process.exit(1);
}

// export const handler = serverless(app);
export const server = createServer(app);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});