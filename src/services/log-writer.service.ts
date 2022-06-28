import { Logger, createRollingFileLogger } from "simple-node-logger";

export class LogWriter {
  private static _instance: LogWriter;

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  private logger!: Logger;

  constructor() {
    this.initLogger();
  }

  private initLogger() {
    const opts = {
      errorEventName: "error",
      logDirectory: "./logs", // NOTE: folder must exist and be writable...
      fileNamePattern: "<DATE>.log",
      dateFormat: "YYYY.MM.DD",
      timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
    };
    this.logger = createRollingFileLogger(opts);
  }

  debug(data: string) {
    console.log(data);
    this.logger.debug(data);
  }

  info(data: string) {
    console.log(data);
    this.logger.info(data);
  }

  warn(data: string) {
    console.log(data);
    this.logger.warn(data);
  }

  fatal(data: string) {
    console.log(data);
    this.logger.fatal(data);
  }
}
