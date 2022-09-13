import { Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { Contract } from './contract/contract.interface';
import { ContractService } from './contract/contract.service';

@Injectable()
export class MarketcapService {
  private contracts: Contract[] = [];
  private logger = new Logger('MarketcapService');
  constructor(private contractService: ContractService) {}
  getHello(): string {
    return 'Hello World!';
  }

  @Timeout(1000)
  storeAllContractAddress() {
    this.contractService.getAllContractAddress().subscribe((value) => {
      this.contracts = this.contracts.concat(value.data);
    });
  }
}
