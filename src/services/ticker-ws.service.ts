import { DataStorageTable } from "../enums/data-storage-tables.enum";
import { PriceRecord } from "../models/price-record";
import { TickerItemDto } from "../models/ticker-item-ws.dto";
import { DataStorageService } from "./data-storage.service";
import { LogWriter } from "./log-writer.service";
const { Spot } = require("@binance/connector");

export class TickerWebsocketService {
  client: any;
  wsRef: any;
  dataStorageService = DataStorageService.getInstance();
  logWriter: LogWriter = LogWriter.getInstance();

  filterRegex: RegExp = new RegExp("USDT$");

  last1MinuteEventNumber: number = 0;
  last1MinuteData: PriceRecord[] = [];

  private static _instance: TickerWebsocketService;

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  constructor() {
    this.client = new Spot("", "", { wsURL: "wss://fstream.binance.com" });
    //this.client = new Spot();
  }

  private onTickerWebsocketOpen(): void {
    this.logWriter.info("websocket connected");
  }

  private onTickerWebsocketClosed(): void {
    this.logWriter.info("websocket disconnected");
  }

  private onTickerWebsocketMessage(data: any): void {
    var decodedData: TickerItemDto[] = JSON.parse(data);
    var filteredData: TickerItemDto[] = decodedData.filter((item) =>
      this.filterRegex.test(item.s)
    );
    this.processChartData(filteredData);
  }

  public startListening(): void {
    this.wsRef = this.client.miniTickerWS(null, {
      open: () => this.onTickerWebsocketOpen(),
      close: () => this.onTickerWebsocketClosed(),
      message: (data: any) => this.onTickerWebsocketMessage(data),
    });
  }

  public stopListening(): void {
    this.client.unsubscribe(this.wsRef);
  }

  private processChartData(data: TickerItemDto[]): void {
    let timestamp = data[0].E;
    this.buffer1MinuteChartData(data, timestamp);
  }

  private buffer1MinuteChartData(
    data: TickerItemDto[],
    eventTimeStamp: number
  ) {
    let eventNumber1Minute: number = Math.ceil(eventTimeStamp / (60 * 1000));

    if (this.last1MinuteEventNumber === 0) {
      this.last1MinuteEventNumber = eventNumber1Minute;
    }

    let movedToNextMinute: boolean =
      eventNumber1Minute === this.last1MinuteEventNumber + 1;

    if (movedToNextMinute) {
      this.store1MinData(this.last1MinuteData, this.last1MinuteEventNumber);
      this.last1MinuteEventNumber = eventNumber1Minute;
      this.last1MinuteData = [];
    }

    data.forEach((item) => {
      let existingItem = this.last1MinuteData.find(
        (element) => element.symbol === item.s
      );
      if (existingItem === undefined) {
        this.last1MinuteData.push(<PriceRecord>{
          symbol: item.s,
          open: item.c,
          close: item.c,
          high: item.c,
          low: item.c,
          event_number: eventNumber1Minute,
        });
      } else {
        if (existingItem.high < item.c) {
          existingItem.high = item.c;
        }
        if (existingItem.low > item.c) {
          existingItem.low = item.c;
        }
        existingItem.close = item.c;
      }
    });
  }

  // 1 minute chart data is the source data set
  private async store1MinData(data: PriceRecord[], eventNumber1Min: number) {
    await this.dataStorageService.storeChartData(
      data,
      DataStorageTable.table1Minute,
      eventNumber1Min
    );
    this.process5MinData(eventNumber1Min);
  }

  private async process5MinData(eventNumberPrevTimeFrame: number) {
    if (eventNumberPrevTimeFrame % 5 === 0) {
      const sourceTableStartEventNumber = eventNumberPrevTimeFrame - 5;
      const eventNumberCurrentTimeFrame = eventNumberPrevTimeFrame / 5;
      await this.processTimeFrameChartData(
        DataStorageTable.table1Minute,
        sourceTableStartEventNumber,
        eventNumberPrevTimeFrame,
        DataStorageTable.table5Minute,
        eventNumberCurrentTimeFrame
      );
      this.process15MinData(eventNumberCurrentTimeFrame);
    }
  }

  private async process15MinData(eventNumberPrevTimeFrame: number) {
    if (eventNumberPrevTimeFrame % 3 === 0) {
      const sourceTableStartEventNumber = eventNumberPrevTimeFrame - 3;
      const eventNumberCurrentTimeFrame = eventNumberPrevTimeFrame / 3;
      await this.processTimeFrameChartData(
        DataStorageTable.table5Minute,
        sourceTableStartEventNumber,
        eventNumberPrevTimeFrame,
        DataStorageTable.table15Minute,
        eventNumberCurrentTimeFrame
      );
      this.process30MinData(eventNumberCurrentTimeFrame);
    }
  }

  private async process30MinData(eventNumberPrevTimeFrame: number) {
    if (eventNumberPrevTimeFrame % 2 === 0) {
      const sourceTableStartEventNumber = eventNumberPrevTimeFrame - 2;
      const eventNumberCurrentTimeFrame = eventNumberPrevTimeFrame / 2;
      await this.processTimeFrameChartData(
        DataStorageTable.table15Minute,
        sourceTableStartEventNumber,
        eventNumberPrevTimeFrame,
        DataStorageTable.table30Minute,
        eventNumberCurrentTimeFrame
      );
      this.process1HrData(eventNumberCurrentTimeFrame);
    }
  }

  private async process1HrData(eventNumberPrevTimeFrame: number) {
    if (eventNumberPrevTimeFrame % 2 === 0) {
      const sourceTableStartEventNumber = eventNumberPrevTimeFrame - 2;
      const eventNumberCurrentTimeFrame = eventNumberPrevTimeFrame / 2;
      await this.processTimeFrameChartData(
        DataStorageTable.table30Minute,
        sourceTableStartEventNumber,
        eventNumberPrevTimeFrame,
        DataStorageTable.table1Hour,
        eventNumberCurrentTimeFrame
      );
      this.process2HrData(eventNumberCurrentTimeFrame);
    }
  }

  private async process2HrData(eventNumberPrevTimeFrame: number) {
    if (eventNumberPrevTimeFrame % 2 === 0) {
      const sourceTableStartEventNumber = eventNumberPrevTimeFrame - 2;
      const eventNumberCurrentTimeFrame = eventNumberPrevTimeFrame / 2;
      await this.processTimeFrameChartData(
        DataStorageTable.table1Hour,
        sourceTableStartEventNumber,
        eventNumberPrevTimeFrame,
        DataStorageTable.table2Hour,
        eventNumberCurrentTimeFrame
      );
      this.process4HrData(eventNumberCurrentTimeFrame);
    }
  }

  private async process4HrData(eventNumberPrevTimeFrame: number) {
    if (eventNumberPrevTimeFrame % 2 === 0) {
      const sourceTableStartEventNumber = eventNumberPrevTimeFrame - 2;
      const eventNumberCurrentTimeFrame = eventNumberPrevTimeFrame / 2;
      await this.processTimeFrameChartData(
        DataStorageTable.table2Hour,
        sourceTableStartEventNumber,
        eventNumberPrevTimeFrame,
        DataStorageTable.table4Hour,
        eventNumberCurrentTimeFrame
      );
      this.process12HrData(eventNumberCurrentTimeFrame);
    }
  }

  private async process12HrData(eventNumberPrevTimeFrame: number) {
    if (eventNumberPrevTimeFrame % 3 === 0) {
      const sourceTableStartEventNumber = eventNumberPrevTimeFrame - 3;
      const eventNumberCurrentTimeFrame = eventNumberPrevTimeFrame / 3;
      await this.processTimeFrameChartData(
        DataStorageTable.table4Hour,
        sourceTableStartEventNumber,
        eventNumberPrevTimeFrame,
        DataStorageTable.table12Hour,
        eventNumberCurrentTimeFrame
      );
      this.process1DayData(eventNumberCurrentTimeFrame);
    }
  }

  private async process1DayData(eventNumberPrevTimeFrame: number) {
    if (eventNumberPrevTimeFrame % 2 === 0) {
      const sourceTableStartEventNumber = eventNumberPrevTimeFrame - 2;
      const eventNumberCurrentTimeFrame = eventNumberPrevTimeFrame / 2;
      await this.processTimeFrameChartData(
        DataStorageTable.table12Hour,
        sourceTableStartEventNumber,
        eventNumberPrevTimeFrame,
        DataStorageTable.table1Day,
        eventNumberCurrentTimeFrame
      );
    }
  }

  private async processTimeFrameChartData(
    sourceTable: DataStorageTable,
    sourceStartEventNumber: number,
    sourceEndEventNumber: number,
    targetTable: DataStorageTable,
    targetEventNumber: number
  ) {
    const sourceTableData = await this.dataStorageService.getChartData(
      sourceTable,
      sourceStartEventNumber,
      sourceEndEventNumber
    );

    if (sourceTableData) {
      let tempTargetData: PriceRecord[] = [];

      sourceTableData.forEach((item) => {
        let existingItem = tempTargetData.find(
          (element) => element.symbol === item.symbol
        );

        if (existingItem) {
          if (existingItem.high < item.high) {
            existingItem.high = item.high;
          }
          if (existingItem.low > item.low) {
            existingItem.low = item.low;
          }
          existingItem.close = item.close;
        } else {
          tempTargetData.push(<PriceRecord>{
            symbol: item.symbol,
            open: item.open,
            close: item.close,
            high: item.high,
            low: item.low,
            event_number: targetEventNumber,
          });
        }
      });

      this.logWriter.info(
        `processed data for ${targetTable} event: ${targetEventNumber}`
      );

      await this.dataStorageService.storeChartData(
        tempTargetData,
        targetTable,
        targetEventNumber
      );
    } else {
      this.logWriter.warn(
        `data not found on ${sourceTable} for processing ${targetTable} data  event: ${targetEventNumber}`
      );
    }
  }
}
