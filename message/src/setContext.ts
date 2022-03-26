import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      context: {
        id: number;
        email: string;
      };
    }
  }
}

const TOKEN_SECRET = "secret";

const setContext = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const [tokenType, token] = authHeader.split(" ");
    if (tokenType === "Bearer") {
      try {
        const jwtPayload = jwt.verify(token, TOKEN_SECRET);
        const { userContext } = jwtPayload as {
          userContext: { id: number; email: string };
        };
        req.context = userContext;
        return next();
      } catch {}
    }
    return res.sendStatus(401);
  }
};

export default setContext;
