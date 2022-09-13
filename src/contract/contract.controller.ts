import { Controller, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ContractServiceClient } from './grpc.interface';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('marketcap')
export class ContractController implements OnModuleInit {
  private svc: ContractServiceClient;
  private logger = new Logger('AppController');

  @Inject('CONTRACTADDRESS_PACKAGE')
  private client: ClientGrpc;

  onModuleInit(): void {
    this.svc = this.client.getService<ContractServiceClient>(
      'ContractAddressService',
    );
  }
}
