import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MarketcapService } from './marketcap.service';
import {
  GetCurrentMarketcapRequest,
  GetMarketcapHistoryRequest,
} from './marketcap.interface';

@Controller()
export class MarketcapController {
  private logger = new Logger('MarketcapController');
  constructor(private readonly marketcapService: MarketcapService) {}

  @GrpcMethod('MarketcapService', 'getCurrentMarketcap')
  async getCurrentMarketcap(req: GetCurrentMarketcapRequest) {
    const data = await this.marketcapService.getMarketcapByAddress(
      req.contractAddress,
    );
    this.logger.log('get marketcap:' + req.contractAddress);
    return {
      marketcap: data.marketcap,
    };
  }

  @GrpcMethod('MarketcapService', 'getMarketcapHistory')
  async getMarketcapHistory(req: GetMarketcapHistoryRequest) {
    this.logger.log('get marketcap history:' + req.contractAddress);
    const marketcaps = await this.marketcapService.getMarketcapsByAddress(
      req.contractAddress,
    );
    const data = marketcaps.map((item) => {
      return {
        date: new Date(item.created_at),
        marketcap: item.marketcap,
      };
    });
    return {
      data,
    };
  }
}
