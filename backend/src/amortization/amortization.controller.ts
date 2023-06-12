import { Controller, Get, Header, Query } from '@nestjs/common';
import { AmortizationBodyDto } from './dtos/amortization.dto';
import { AmortizationService } from './amortization.service';

@Controller('amortization')
export class AmortizationController {
  constructor(private amortizationService: AmortizationService) {}

  @Get('/scheduleData')
  @Header('content-type', 'application/json')
  getAmortizationScheduleData(
    @Query('loanAmount') loanAmount: number,
    @Query('debitInterest') debitInterest: number,
    @Query('redemption') redemption: number,
    @Query('period') period: number,
  ) {
    const amortizationDto = {} as AmortizationBodyDto;
    amortizationDto.loanAmount = loanAmount;
    amortizationDto.debitInterest = debitInterest;
    amortizationDto.redemption = redemption;
    amortizationDto.period = period;
    return this.amortizationService.getAmortizationScheduleData(
      amortizationDto,
    );
  }

  @Get('/residualDebts')
  @Header('content-type', 'application/json')
  getResidualDebts(
    @Query('loanAmount') loanAmount: number,
    @Query('debitInterest') debitInterest: number,
    @Query('redemption') redemption: number,
    @Query('period') period: number,
  ) {
    const amortizationDto = {} as AmortizationBodyDto;
    amortizationDto.loanAmount = loanAmount;
    amortizationDto.debitInterest = debitInterest;
    amortizationDto.redemption = redemption;
    amortizationDto.period = period;
    return this.amortizationService.getResidualDebts(amortizationDto);
  }

  @Get('/mothlyRate')
  @Header('content-type', 'application/json')
  getMonthlyRate(
    @Query('loanAmount') loanAmount: number,
    @Query('debitInterest') debitInterest: number,
    @Query('redemption') redemption: number,
  ) {
    return this.amortizationService.getcalculateMonthlyRate(
      loanAmount,
      debitInterest,
      redemption,
    );
  }
}
