import { ConnectionOpts, SQLObject } from "../types/mysql.types";

const SQL: SQLObject = {
  connection: "",
  createConnection: (
    driver: string = "mysql",
    db_setting: ConnectionOpts = {
      connectionLimit: 10,
      user: "root",
      host: "localhost",
      password: "",
      database: "orm",
      port: 3306,
    }
  ) => {
    let sqlDriver;
    if (driver === "mysql") {
      sqlDriver = require("mysql");
    }
    SQL.connection = sqlDriver.createPool(db_setting);
  },
  models: [],
};
SQL.createConnection();
export { SQL };
