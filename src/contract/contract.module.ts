import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ContractService } from './contract.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONTRACT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50053',
          package: 'contract',
          protoPath: join(__dirname, '../../src/protos/contract.proto'),
        },
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
