import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import jwt from "jsonwebtoken";
import routes from "./routes";

const PORT = 3001;
const TOKEN_SECRET = process.env.TOKEN_SECRET!;

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("tiny", { immediate: true }));

const checkAuth =
  (auth: boolean) => (req: Request, res: Response, next: NextFunction) => {
    if (!auth) return next();
    else {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const [tokenType, token] = authHeader.split(" ");
        if (tokenType === "Bearer") {
          try {
            jwt.verify(token, TOKEN_SECRET);
            return next();
          } catch {}
        }
      }
      return res.sendStatus(401);
    }
  };

routes.forEach((route) =>
  app.use(route.url, checkAuth(route.auth), createProxyMiddleware(route.proxy))
);

app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
