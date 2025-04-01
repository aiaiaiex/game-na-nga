import express from "express";

import { SERVER } from "./config";
import { userRouter } from "./routes/user";

const server = express();

server.use(express.json());

server.use("/user", userRouter);

server.get("/ping", async (req, res) => {
  res.json({ msg: "pong!" });
});

server.listen(SERVER.port, () => {
  console.log(`Server listening on port ${SERVER.port}`);
});
