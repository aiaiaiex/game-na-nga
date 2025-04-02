import dotenv from "dotenv";

dotenv.config();

const SERVER_URL = import.meta.env.SERVER_URL || "http://localhost:8080";
export const SERVER = {
  url: SERVER_URL,
};
