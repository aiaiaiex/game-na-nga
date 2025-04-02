import { Router } from "express";
import { z } from "zod";
import { sha256 } from "js-sha256";
import jwt from "jsonwebtoken";

import { pool } from "../mysql";
import { HMAC, JWT } from "../config";
import { verifyJWTToken } from "../middlewares/verifyJWTToken";

export const userRouter = Router();

userRouter.post("/signup", async (req, res): Promise<any> => {
  const z_result = z
    .object({
      email: z.string().toLowerCase().trim().min(6).max(254),
      username: z.string().trim().min(1).max(36),
      password: z.string().trim().min(12),
    })
    .safeParse(req.body);

  if (z_result.success) {
    const { email, username, password } = z_result.data;
    try {
      await pool.query(
        "INSERT INTO `user` (email, username, password) VALUES (?, ?, ?)",
        [email, username, sha256.hmac(HMAC.key, password)]
      );

      await pool.query("INSERT INTO `log` (email, action) VALUES (?, ?)", [
        email,
        `SIGN UP username: ${username}`,
      ]);

      return res.sendStatus(200);
    } catch {
      return res.sendStatus(400);
    }
  } else {
    return res.sendStatus(400);
  }
});

userRouter.post("/login", async (req, res): Promise<any> => {
  const z_result = z
    .object({
      email: z.string().toLowerCase().trim().min(6).max(254),
      password: z.string().trim().min(12),
    })
    .safeParse(req.body);

  if (z_result.success) {
    const { email, password } = z_result.data;
    try {
      const [mysql_result] = await pool.query<any[]>(
        "SELECT username FROM `user` WHERE email = ? AND password = ?",
        [email, sha256.hmac(HMAC.key, password)]
      );

      if (mysql_result.length > 0) {
        const jwt_token = jwt.sign({ email: email }, JWT.key, {
          expiresIn: JWT.expiration_seconds,
        });

        res.cookie("game_na_nga_jwt_token", jwt_token, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          maxAge: JWT.expiration_seconds * 1000,
        });
        await pool.query("INSERT INTO `log` (email, action) VALUES (?, ?)", [
          email,
          "LOG IN success",
        ]);
        return res.sendStatus(200);
      } else {
        await pool.query("INSERT INTO `log` (email, action) VALUES (?, ?)", [
          email,
          "LOG IN FAILED!",
        ]);
        return res.sendStatus(401);
      }
    } catch {
      return res.sendStatus(400);
    }
  } else {
    return res.sendStatus(400);
  }
});

userRouter.post("/logout", verifyJWTToken, async (_req, res): Promise<any> => {
  const z_result = z
    .string()
    .toLowerCase()
    .trim()
    .min(6)
    .max(254)
    .safeParse(res.locals.email);

  if (z_result.success) {
    const email = z_result.data;
    try {
      res.clearCookie("game_na_nga_jwt_token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });

      await pool.query("INSERT INTO `log` (email, action) VALUES (?, ?)", [
        email,
        "LOG OUT success",
      ]);
      return res.sendStatus(200);
    } catch {
      await pool.query("INSERT INTO `log` (email, action) VALUES (?, ?)", [
        email,
        "LOG OUT FAILED!",
      ]);
      return res.sendStatus(400);
    }
  } else {
    return res.sendStatus(400);
  }
});

userRouter.get("/verify", verifyJWTToken, async (_req, res): Promise<any> => {
  return res.sendStatus(200);
});
