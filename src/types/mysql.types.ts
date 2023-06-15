export interface QueryResults {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}

export interface SingleQueryResult {
  fields: FieldPacket[];
  data: Object;
}
export interface InsertionResults extends QueryResults {}

export interface DeleteResults extends QueryResults {}

export interface FieldPacket {
  catalog: string;
  db: string;
  table: string;
  orgTable: string;
  name: string;
  orgName: string;
  charsetNr: number;
  length: number;
  type: 3;
  flags: 16899;
  decimals: 0;
  default: undefined;
  zeroFill: false;
  protocol41: true;
}
export type ConnectionOpts = {
  connectionLimit?: number;
  user: string;
  host: string;
  password: string;
  database: string;
  port: number;
};

export interface SQLObject {
  driver?: string;
  connection: any;
  createConnection: (
    sqlDriver?: string,
    connection_options?: ConnectionOpts
  ) => void;
  models: any[];
}
