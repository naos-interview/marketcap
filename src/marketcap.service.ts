import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Contract } from './contract/contract.interface';
import { ContractService } from './contract/contract.service';
import { Marketcap } from './db/entities/marketcap.entity';
import { EtherService } from './ether/ether.service';
import moment from 'moment';

@Injectable()
export class MarketcapService {
  private contracts: Contract[] = [];
  private logger = new Logger('MarketcapService');
  constructor(
    @InjectRepository(Marketcap)
    private markercapRepo: Repository<Marketcap>,
    private etherService: EtherService,
    private contractService: ContractService,
  ) {}

  async getMarketcapByAddress(address: string) {
    const marketcap = await this.markercapRepo.findOne({
      where: {
        address,
      },
      order: {
        created_at: 'DESC',
      },
    });
    return marketcap;
  }

  async getMarketcapsByAddress(address: string) {
    const currentTime = moment();
    const pastTime = moment();
    pastTime.subtract(3, 'hours');
    const marketCaps = await this.markercapRepo.find({
      where: {
        address,
        created_at: Between(pastTime.toDate(), currentTime.toDate()),
      },
      order: {
        created_at: 'DESC',
      },
    });
    return marketCaps;
  }

  private async createMarketcap(data) {
    const newMarketcap = this.markercapRepo.create(data);
    await this.markercapRepo.save(newMarketcap);
  }

  @Timeout(1000)
  private storeAllContractAddress() {
    this.contractService.getAllContractAddress().subscribe((value) => {
      this.contracts = this.contracts.concat(value.data);
    });
  }

  @Timeout(2000)
  private async getMarketcapCron() {
    for (const item of this.contracts) {
      const startTime = new Date().getTime();
      const marketCap = await this.etherService.getMarketcap(item.address);
      await this.createMarketcap({
        address: item.address,
        marketcap: marketCap,
      });
      const endTime = new Date().getTime();

      this.logger.log(
        `get ${item.address} marketcap spend ${endTime - startTime} ms`,
      );
    }
    this.getMarketcapCron();
  }
}
