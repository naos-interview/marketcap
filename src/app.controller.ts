import { Controller, Get, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  GetCurrentMarketcapRequest,
  GetMarketcapHistoryRequest,
} from './marketcap.interface';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

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
