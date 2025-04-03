import { Router } from "express";
import { z } from "zod";

import { pool } from "../mysql";
import { verifyJWTToken } from "../middlewares/verifyJWTToken";

export const reviewRouter = Router();

reviewRouter.post("/create", verifyJWTToken, async (req, res): Promise<any> => {
  const z_email = z
    .string()
    .toLowerCase()
    .trim()
    .min(6)
    .max(254)
    .safeParse(res.locals.email);

  const z_result = z
    .object({
      game: z.string().trim().min(1).max(70),
      title: z.string().trim().min(1).max(70),
      stars: z.number().int().gte(0).lte(5),
      text: z.string().trim().min(1).max(280),
    })
    .safeParse(req.body);

  if (z_email.success && z_result.success) {
    const email = z_email.data;
    const { game, title, stars, text } = z_result.data;
    try {
      await pool.query(
        "INSERT INTO `review` (author, game, title, stars, text) VALUES (?, ?, ?, ?, ?)",
        [email, game, title, stars, text]
      );

      await pool.query("INSERT INTO `log` (email, action) VALUES (?, ?)", [
        email,
        `CREATE review: ${game}: ${title}`,
      ]);
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(400);
    }
  } else {
    return res.sendStatus(400);
  }
});

reviewRouter.get(
  "/read-all",
  verifyJWTToken,
  async (_req, res): Promise<any> => {
    try {
      const [reviews] = await pool.query<any[]>(
        "SELECT * FROM `review` ORDER BY timestamp DESC"
      );
      res.json(reviews);
    } catch {
      return res.sendStatus(400);
    }
  }
);

reviewRouter.post("/update", verifyJWTToken, async (req, res): Promise<any> => {
  const z_email = z
    .string()
    .toLowerCase()
    .trim()
    .min(6)
    .max(254)
    .safeParse(res.locals.email);

  const z_result = z
    .object({
      id: z.number().int().gte(1),
      game: z.string().trim().min(1).max(70),
      title: z.string().trim().min(1).max(70),
      stars: z.number().int().gte(0).lte(5),
      text: z.string().trim().min(1).max(280),
    })
    .safeParse(req.body);

  if (z_email.success && z_result.success) {
    const email = z_email.data;
    const { id, game, title, stars, text } = z_result.data;
    try {
      await pool.query(
        "UPDATE `review` SET game = ?, title = ?, stars = ?, text = ?, timestamp = CURRENT_TIMESTAMP WHERE id = ? AND author = ?",
        [game, title, stars, text, id, email]
      );

      await pool.query("INSERT INTO `log` (email, action) VALUES (?, ?)", [
        email,
        `UPDATE review #${id}: ${game}: ${title}`,
      ]);
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(400);
    }
  } else {
    return res.sendStatus(400);
  }
});

reviewRouter.post("/delete", verifyJWTToken, async (req, res): Promise<any> => {
  const z_email = z
    .string()
    .toLowerCase()
    .trim()
    .min(6)
    .max(254)
    .safeParse(res.locals.email);

  const z_result = z
    .object({
      id: z.number().int().gte(1),
    })
    .safeParse(req.body);

  if (z_email.success && z_result.success) {
    const email = z_email.data;
    const { id } = z_result.data;
    try {
      await pool.query("DELETE FROM `review` WHERE id = ? AND author = ?", [
        id,
        email,
      ]);

      await pool.query("INSERT INTO `log` (email, action) VALUES (?, ?)", [
        email,
        `DELETE review #${id}`,
      ]);
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(400);
    }
  } else {
    return res.sendStatus(400);
  }
});
