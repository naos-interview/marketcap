import { Module } from '@nestjs/common';
import { MarketcapController } from './marketcap.controller';
import { MarketcapService } from './marketcap.service';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [ContractModule],
  controllers: [MarketcapController],
  providers: [MarketcapService],
})
export class MarketcapModule {}
