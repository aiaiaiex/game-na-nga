import { Request, Response, NextFunction, response } from "express";
import jwt from "jsonwebtoken";

import { JWT } from "../config";

export async function verifyJWTToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const jwt_token = req.cookies.game_na_nga_jwt_token;
  if (jwt_token) {
    try {
      const { email } = jwt.verify(jwt_token, JWT.key, {
        maxAge: JWT.expiration_seconds,
      }) as { email: string };
      res.locals.email = email;
      return next();
    } catch {
      return response.sendStatus(401);
    }
  } else {
    return res.sendStatus(400);
  }
}
