import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  ContractServiceClient,
  GetAllContractAddressResponse,
} from './contract.interface';

@Injectable()
export class ContractService implements OnModuleInit {
  private logger = new Logger('ContractService');
  private svc: ContractServiceClient;

  constructor(
    @Inject('CONTRACT_PACKAGE')
    private client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.svc = this.client.getService<ContractServiceClient>(
      'ContractAddressService',
    );
  }

  getAllContractAddress(): Observable<GetAllContractAddressResponse> {
    return this.svc.getAllContractAddress({});
  }
}
