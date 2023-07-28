import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import apiRouter from "./routes";

const server: Express = express();

server.use(cors());
server.use(helmet());
server.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    skip: () => process.env.NODE_ENV === "test",
  }),
);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get("/", (req: Request, res: Response) => {
  res.send("ShareMyCode 2.0 | API Server");
});

server.use("/api", apiRouter);

server.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Healthy!");
});

server.use((req: Request, res: Response, next: NextFunction) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    next(err);
  } else next();
});

export default server;
