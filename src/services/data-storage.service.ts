import { DataStorageTable } from "../enums/data-storage-tables.enum";
import { PriceRecord } from "../models/price-record";
import { TickerWebsocketService } from "./ticker-ws.service";
import * as MySql from "mysql2/promise";
import "dotenv/config";
import { LogWriter } from "./log-writer.service";

export class DataStorageService {
  private conn!: MySql.Pool;
  private recordHistoryLimit = 250;
  private logWriter: LogWriter = LogWriter.getInstance();

  private static _instance: DataStorageService;

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase(): Promise<void> {
    this.conn = await MySql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  public async storeChartData(
    data: PriceRecord[],
    tableName: DataStorageTable,
    eventNumber: number
  ): Promise<void> {
    if (data.length > 0) {
      let insertQuery = `INSERT INTO ${tableName} (symbol, open, close, high, low, event_number, timestamp) VALUES`;

      data.forEach((element: PriceRecord) => {
        insertQuery += `('${element.symbol}', ${element.open}, ${element.close}, ${element.high}, ${element.low}, ${element.event_number}, NOW()), `;
      });

      insertQuery = insertQuery.slice(0, -2);
      insertQuery += ";";

      try {
        const res: any = await this.conn.query(insertQuery);
        const resultHeaders: MySql.ResultSetHeader = res[0];
        this.logWriter.info(
          `inserted ${resultHeaders.affectedRows} rows to ${tableName}`.toString()
        );
      } finally {
        this.clearUnnecessaryHistory(eventNumber, tableName);
      }
    }
  }

  private async clearUnnecessaryHistory(
    eventNumber: number,
    tableName: DataStorageTable
  ): Promise<void> {
    let historyLimit = eventNumber - this.recordHistoryLimit;
    let deleteQuery = `DELETE FROM ${tableName} WHERE event_number < ${historyLimit};`;
    try {
      const res = await this.conn.query(deleteQuery);
    } finally {
    }
  }

  public async getChartData(
    tableName: DataStorageTable,
    eventNumberStart: number,
    eventNumberEnd: number
  ): Promise<PriceRecord[] | null> {
    let fetchQuery = `SELECT * FROM ${tableName} WHERE event_number > ${eventNumberStart} AND event_number <= ${eventNumberEnd} ORDER BY id ASC;`;
    try {
      const [rows, fields] = await this.conn.execute(fetchQuery);
      return <PriceRecord[]>rows;
    } catch (error) {
      return null;
    }
  }
}
