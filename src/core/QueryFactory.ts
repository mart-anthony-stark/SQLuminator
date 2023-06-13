import { FieldModifier, FieldType, FilterData } from "../types/constants";
import { buildConditions } from "../utils";

export default class QueryFactory {
  insert(tableName: string, data: Object) {
    const iterator: string = Object.keys(data)
      .map((i: any, idx: number) => `?`)
      .join(",");
    const keys: string = Object.keys(data).join(",");
    return `INSERT INTO ${tableName} (${keys}) VALUES (${iterator})`;
  }

  /**
   * Query builder for filtering data
   * @param name
   * @param data
   * @returns
   */
  retrieve(tableName: string, data?: FilterData) {
    let conditions = "";

    // IF THERE IS A CONDITION OBJECT BUILD QUERY USING KEYS AND VALUES
    if (data?.where) {
      conditions = buildConditions(data?.where);
    }

    let query = `SELECT ${
      data?.columns ? data?.columns.join() : "*"
    } FROM ${tableName}`;
    if (conditions) query += ` WHERE ${conditions}`;
    return query;
  }

  update(tableName: string, data: any, where: any) {
    let updater = "";
    let conditions = "";

    // If there is a condition object build query using keys and values
    if (where) {
      const conditionKeys = Object.keys(where);
      const conditionValues = Object.values(where).map((value) =>
        typeof value === "string" ? `'${value}'` : value
      );
      conditionKeys.forEach((key, index) => {
        conditions += `${key} = ${conditionValues[index]}${
          index === conditionKeys.length - 1 ? "" : " AND "
        }`;
      });
    }

    if (data) {
      const dataKey = Object.keys(data);
      updater = dataKey.map((d) => ` ${d} = ?`).join(",");
    }
    let query = `UPDATE ${tableName} SET${updater} `;
    if (conditions) query += ` WHERE ${conditions}`;
    return query;
  }

  delete(tableName: string, where: Object) {
    let conditions = "";
    // IF THERE IS A CONDITION OBJECT BUILD QUERY USING KEYS AND VALUES
    if (where) {
      conditions = buildConditions(where);
    }

    let query = `DELETE from ${tableName}`;
    if (conditions) query += ` WHERE ${conditions}`;
    return query;
  }
}

class TableInitializer {
  tableName: string;
  fields: { name: string; type: FieldType; modifiers?: FieldModifier[] }[];

  constructor(tableName: string) {
    this.tableName = tableName;
    this.fields = [];
  }

  addField(name: string, type: FieldType, modifiers?: FieldModifier[]) {
    this.fields.push({ name, type, modifiers });
  }

  generateCreateTableQuery(): string {
    let query = `CREATE TABLE ${this.tableName} (`;

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      const modifiers = field.modifiers ? field.modifiers.join(" ") : "";
      query += `${field.name} ${field.type} ${modifiers}`;

      if (i !== this.fields.length - 1) {
        query += ", ";
      }
    }

    query += ");";
    return query;
  }
}

export const queryFactory = new QueryFactory();
