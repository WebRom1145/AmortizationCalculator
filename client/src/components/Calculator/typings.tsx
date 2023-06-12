export type LoanData = {
  loanAmount: number;
  debitInterest: number;
  redemption: number;
  period: number;
};

export type AmortizationScheduleData = {
  year: number;
  rate: number;
  interestPortion: number;
  repaymentPart: number;
  residualDebt: number;
};
