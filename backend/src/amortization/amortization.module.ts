import { AmortizationController } from './amortization.controller';
import { AmortizationService } from './amortization.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [AmortizationService],
  controllers: [AmortizationController],
})
export class AmortizationModule {}
