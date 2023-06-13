export enum FieldType {
  INT = "INT",
  BIGINT = "BIGINT",
  FLOAT = "FLOAT",
  DOUBLE = "DOUBLE",
  DECIMAL = "DECIMAL",
  CHAR = "CHAR",
  VARCHAR = "VARCHAR",
  TEXT = "TEXT",
  DATE = "DATE",
  DATETIME = "DATETIME",
  TIMESTAMP = "TIMESTAMP",
  BOOLEAN = "BOOLEAN",
}

export enum FieldModifier {
  PK = "PRIMARY KEY AUTO_INCREMENT",
  UNIQUE = "UNIQUE",
  NOT_NULL = "NOT NULL",
  AUTO_INCREMENT = "AUTO_INCREMENT",
}

export interface FilterData {
  columns?: any[];
  where?: Object;
}
