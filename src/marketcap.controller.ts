import { Controller, Get, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MarketcapService } from './marketcap.service';
import {
  GetCurrentMarketcapRequest,
  GetMarketcapHistoryRequest,
} from './marketcap.interface';

@Controller()
export class MarketcapController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: MarketcapService) {}

  @GrpcMethod('MarketcapService', 'getCurrentMarketcap')
  getCurrentMarketcap(req: GetCurrentMarketcapRequest) {
    this.logger.log('get marketcap:' + req.contractAddress);
    return {
      marketcap: '123443',
    };
  }

  @GrpcMethod('MarketcapService', 'getMarketcapHistory')
  getMarketcapHistory(req: GetMarketcapHistoryRequest) {
    this.logger.log('get marketcap history:' + req.contractAddress);
    return {
      data: [
        {
          date: new Date(),
          marketcap: '1231234233',
        },
      ],
    };
  }
}
