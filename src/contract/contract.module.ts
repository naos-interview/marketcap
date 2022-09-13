import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ContractController } from './contract.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONTRACTADDRESS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50053',
          package: 'contractAddress',
          protoPath: join(
            __dirname,
            '../../src/contractAddress/protos/contractAddress.proto',
          ),
        },
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ContractController],
})
export class ContractModule {}
