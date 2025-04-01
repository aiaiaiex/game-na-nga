import mysql from "mysql2";
import { MYSQL } from "./config";

export const pool = mysql
  .createPool({
    host: MYSQL.host,
    port: MYSQL.port,
    user: MYSQL.user,
    password: MYSQL.password,
    database: MYSQL.database,
  })
  .promise();
