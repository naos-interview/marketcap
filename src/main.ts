import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

const microServiceOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50054',
    package: 'marketcap',
    protoPath: join(__dirname, '../src//protos/marketcap.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microServiceOptions,
  );
  await app.listen();
}
bootstrap();
