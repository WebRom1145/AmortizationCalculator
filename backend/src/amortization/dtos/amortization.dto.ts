import { IsNotEmpty, IsNumber } from 'class-validator';

export class AmortizationBodyDto {
  @IsNumber()
  @IsNotEmpty()
  loanAmount: number;

  @IsNumber()
  @IsNotEmpty()
  debitInterest: number;

  @IsNumber()
  @IsNotEmpty()
  redemption: number;

  @IsNumber()
  @IsNotEmpty()
  period: number;
}
