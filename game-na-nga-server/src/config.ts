import dotenv from "dotenv";

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_PORT = Number(process.env.MYSQL_PORT ?? 3306);
const MYSQL_USER = process.env.MYSQL_USER || "user";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "password";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "database";

export const MYSQL = {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};

const SERVER_PORT = Number(process.env.SERVER_PORT ?? 8080);

export const SERVER = {
  port: SERVER_PORT,
};

const SHA_256_HMAC_KEY = process.env.SHA_256_HMAC_KEY || "HMAC";
const JSON_WEB_TOKEN_KEY = process.env.JSON_WEB_TOKEN_KEY || "JWT";

export const KEYS = {
  hmac: SHA_256_HMAC_KEY,
  jwt: JSON_WEB_TOKEN_KEY,
};
