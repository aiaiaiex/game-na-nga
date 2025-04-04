import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { CLIENT, SERVER } from "./config";
import { userRouter } from "./routes/user";
import { reviewRouter } from "./routes/review";

const server = express();

server.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  cors({
    origin: CLIENT.url,
    allowedHeaders: ["Content-Type"],
    methods: ["POST", "GET"],
    credentials: true,
  }),
]);

server.use("/user", userRouter);
server.use("/review", reviewRouter);

server.get("/ping", async (req, res) => {
  res.json({ msg: "pong!" });
});

server.listen(SERVER.port, () => {
  console.log(`Server listening on http://localhost:${SERVER.port}`);
});
