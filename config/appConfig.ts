import { CorsOptions } from "cors";
import { SessionOptions } from "express-session";

export class AppConfig {
  public static readonly corsOptions: CorsOptions = {
    origin: ["*"],
    credentials: true,
    optionsSuccessStatus: 200,
  };

  public static readonly sessionOptions: SessionOptions = {
    secret: "deventum-api",
    resave: true,
    saveUninitialized: true,
  };

  public static readonly BODY_PARSER_LIMIT = "10mb";
}
