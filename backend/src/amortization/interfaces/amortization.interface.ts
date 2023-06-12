export interface LoanData {
  loanAmount: number;
  debitInterest: number;
  redemption: number;
  period: number;
}

export interface AmortizationScheduleData {
  year: number;
  rate: number;
  interestPortion: number;
  repaymentPart: number;
  residualDebt: number;
}
