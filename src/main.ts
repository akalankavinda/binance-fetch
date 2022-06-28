import { TickerWebsocketService } from "./services/ticker-ws.service";

const tickerWsService = TickerWebsocketService.getInstance();

tickerWsService.startListening();
