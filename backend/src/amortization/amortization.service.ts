import {
  AmortizationScheduleData,
  LoanData,
} from './interfaces/amortization.interface';

import { Injectable } from '@nestjs/common';
import { round } from '../common/helpers';

@Injectable()
export class AmortizationService {
  public getcalculateMonthlyRate(
    loanAmount: number,
    debitInterest: number,
    redemption: number,
  ) {
    const redemptionYear = (loanAmount / 100) * redemption;
    const interestPortionYear = (loanAmount / 100) * debitInterest;
    const monthlyRate = (redemptionYear + interestPortionYear) / 12;
    return JSON.stringify({ monthlyRate: monthlyRate });
  }

  public getAmortizationScheduleData(loanData: LoanData) {
    const redemptionYear = (loanData.loanAmount / 100) * loanData.redemption;
    const interestPortionYear =
      (loanData.loanAmount / 100) * loanData.debitInterest;
    const yearlyRate = redemptionYear + interestPortionYear;
    const residualDebt = loanData.loanAmount - redemptionYear;
    const currentYear = new Date().getFullYear();
    const data: AmortizationScheduleData[] = [];
    for (let index = 0; index < loanData.period; index++) {
      let interestPortion: number;
      let redemption;
      let residualDebts;

      if (index === 0) {
        interestPortion = interestPortionYear;
        redemption = redemptionYear;
        residualDebts = residualDebt;
      } else {
        interestPortion =
          (data[index - 1].residualDebt / 100) * loanData.debitInterest;
        redemption = yearlyRate - interestPortion;
        if (redemption >= data[index - 1].residualDebt) {
          redemption = data[index - 1].residualDebt;
          residualDebts = data[index - 1].residualDebt - redemption;
          if (data[index - 1].residualDebt === 0) {
            break;
          }
        } else {
          redemption = yearlyRate - interestPortion;
          residualDebts = data[index - 1].residualDebt - redemption;
        }
      }
      const createAmortizationScheduleDataObject = (
        year: number,
        rate: number,
        interestPortion: number,
        repaymentPart: number,
        residualDebt: number,
      ): AmortizationScheduleData => {
        return { year, rate, interestPortion, repaymentPart, residualDebt };
      };

      data.push(
        createAmortizationScheduleDataObject(
          currentYear + index,
          yearlyRate,
          round(interestPortion),
          round(redemption),
          round(residualDebts),
        ),
      );
    }
    return JSON.stringify({ amortizationScheduleData: data });
  }

  public getResidualDebts(loanData: LoanData) {
    const redemptionYear = (loanData.loanAmount / 100) * loanData.redemption;
    const interestPortionYear =
      (loanData.loanAmount / 100) * loanData.debitInterest;
    const yearlyRate = redemptionYear + interestPortionYear;
    let residualDebt = 0;
    for (let index = 0; index < loanData.period; index++) {
      if (index === 0) {
        residualDebt = loanData.loanAmount;
      }
      const zins = (residualDebt / 100) * loanData.debitInterest;
      let tilgung = yearlyRate - zins;
      if (tilgung >= residualDebt) {
        tilgung = residualDebt;
      }
      residualDebt = residualDebt - tilgung;

      if (residualDebt === 0) {
        break;
      }
    }

    return JSON.stringify({ residualDebt: round(residualDebt) });
  }
}
