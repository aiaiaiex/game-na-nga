import { Router } from "express";
import { z } from "zod";
import { sha256 } from "js-sha256";

import { pool } from "../mysql";
import { KEYS } from "../config";

export const userRouter = Router();

userRouter.post("/signup", async (req, res): Promise<any> => {
  const result = z
    .object({
      email: z.string().trim().min(6).max(254),
      username: z.string().trim().min(1).max(36),
      password: z.string().trim().min(12),
    })
    .safeParse(req.body);

  if (!result.success) {
    return res.sendStatus(400);
  } else {
    const { email, username, password } = result.data;
    try {
      await pool.query(
        "INSERT INTO `user` (email, username, password) VALUES (?, ?, ?)",
        [email, username, sha256.hmac(KEYS.hmac, password)]
      );

      await pool.query("INSERT INTO `log` (email, action) VALUES (?, ?)", [
        email,
        `REGISTER username: ${username}`,
      ]);

      return res.sendStatus(200);
    } catch {
      return res.sendStatus(400);
    }
  }
});
