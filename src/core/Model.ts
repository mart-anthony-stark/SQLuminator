import {
  DeleteResults,
  FieldPacket,
  InsertionResults,
  QueryResults,
  SingleQueryResult,
} from "../types/mysql.types";
import { pluralize } from "../utils";
import { queryFactory } from "./QueryFactory";
import { SQL } from "./sql";

export class Model {
  private table: string;
  private schema: any;
  constructor(tableName: string, schema?: any) {
    this.table = pluralize(tableName);
    this.schema = schema;
  }

  /**
   * Insert new record
   * @param data
   * @returns Promise
   */
  save(data: Object = {}): Promise<InsertionResults> {
    const sql = queryFactory.insert(this.table, data);
    return new Promise((resolve, reject) => {
      SQL.connection.query(
        sql,
        Object.values(data),
        (err: any, results: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  /**
   * Retrieve single record by id
   * @param id
   * @returns Promise
   */
  findById(id: number, lean = false): Promise<SingleQueryResult> {
    const sql = `SELECT * FROM ${this.table} WHERE id = ?`;
    return new Promise((resolve, reject) => {
      SQL.connection.query(
        sql,
        [id],
        (err: any, results: any, fields: FieldPacket[]) => {
          if (err) {
            reject(err);
          } else {
            const response = lean
              ? results
              : {
                  data: results,
                  fields,
                };
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Get all Records that satisfies the `where` condition
   * @param data
   * @returns Promise
   */
  find(data: { columns?: []; where?: any; lean?: boolean } = {}): any {
    const sql = queryFactory.retrieve(this.table, data);
    const positionalParams = data.where ? Object.values(data.where) : undefined;
    return new Promise((resolve, reject) => {
      SQL.connection.query(
        sql,
        positionalParams,
        (err: any, results: any, fields: FieldPacket[]) => {
          if (err) {
            reject(err);
          } else {
            const response = data?.lean
              ? results
              : {
                  data: results,
                  fields,
                };
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Delete single record by id
   * @param id
   * @returns
   */
  findByIdAndDelete(id: number): Promise<DeleteResults> {
    const sql = queryFactory.delete(this.table, { id });
    return new Promise((resolve, reject) => {
      SQL.connection.query(sql, [id], (err: any, results: QueryResults) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   *
   * @param where
   * @returns
   */
  deleteMany(where?: any) {
    const sql = queryFactory.delete(this.table, where);
    const positionalParams = where ? Object.values(where) : undefined;
    return new Promise((resolve, reject) => {
      SQL.connection.query(
        sql,
        positionalParams,
        (err: any, results: QueryResults) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  createTable() {
    if (!this.schema) {
      console.log(
        "WARNING: Table schema not found! " +
          "`" +
          this.table +
          "` table is not created."
      );
      return;
    }
    let createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${this.table} (`;
    const keys = Object.keys(this.schema);
    const values: any = Object.values(this.schema);

    keys.forEach((fieldName, index) => {
      let value: unknown = values[index];

      if (typeof values[index] == "object" && values[index] !== null) {
        value = values[index].join(" ");
      }

      createTableQuery += `
        ${fieldName} ${value}${index !== keys.length - 1 ? "," : ""}`;
    });
    createTableQuery += ");";
    console.log(createTableQuery);
  }
}
