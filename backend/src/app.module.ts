import { AmortizationModule } from './amortization/amortization.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [AmortizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
