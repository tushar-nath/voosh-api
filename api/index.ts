import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import http from "http";
import "../config/passport";
import { AppConfig } from "../config/appConfig";

dotenv.config();

class App {
  private app: express.Application;
  private server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(cors(AppConfig.corsOptions));
    this.app.use(express.json());
    this.app.use(session(AppConfig.sessionOptions));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private configureRoutes(): void {
    this.app.get("/api/healthcheck", (_req, res) => {
      res.status(200).json({ message: "Server is up and running" });
    });
  }

  public start(): void {
    const PORT = process.env.PORT || 8000;
    this.server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  }
}

const server = new App();
server.start();
