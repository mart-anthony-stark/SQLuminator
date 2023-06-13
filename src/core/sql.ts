import { SQLObject } from "../types/mysql.types";
const mysql = require("mysql");

/**
 * MySQL connection - uses native mysql driver
 */
export const SQL: SQLObject = {
  connection: mysql.createPool({
    connectionLimit: process.env.DB_CONN_LIMIT || 10,
    user: process.env.DB_USER || "root",
    host: process.env.DB_HOST || "localhost",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "orm",
    port: process.env.DB_PORT || 3306,
  }),
  models: [],
};
