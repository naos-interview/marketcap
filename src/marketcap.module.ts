import { Module } from '@nestjs/common';
import { MarketcapController } from './marketcap.controller';
import { MarketcapService } from './marketcap.service';
import { ContractModule } from './contract/contract.module';
import { EtherModule } from './ether/ehter.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './db/typeorm.config';
import { Marketcap } from './db/entities/marketcap.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([Marketcap]),
    ContractModule,
    EtherModule,
  ],
  controllers: [MarketcapController],
  providers: [MarketcapService],
})
export class MarketcapModule {}
