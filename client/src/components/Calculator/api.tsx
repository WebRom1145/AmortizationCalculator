import { AmortizationScheduleData, LoanData } from "./typings";

import { AMORTIZATION_ENDPOINT } from "./constants";
import { createUrlString } from "../../common/helpers";

export const getAmortizationScheduleData = async (
  data: LoanData
): Promise<{ amortizationScheduleData: AmortizationScheduleData[] }> => {
  try {
    const url = `${AMORTIZATION_ENDPOINT}/scheduleData?`;
    const query = createUrlString(data);
    const response = await fetch(url + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};

export const getResidualDebts = async (
  data: LoanData
): Promise<{ residualDebt: number }> => {
  try {
    const url = `${AMORTIZATION_ENDPOINT}/residualDebts?`;
    const query = createUrlString(data);
    const response = await fetch(url + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};

export const getMonthlyRate = async (
  loanAmount: string,
  debitInterest: string,
  redemption: string
): Promise<{ monthlyRate: number }> => {
  try {
    const url = `${AMORTIZATION_ENDPOINT}/mothlyRate?`;
    const params = new URLSearchParams();
    params.append("loanAmount", loanAmount);
    params.append("debitInterest", debitInterest);
    params.append("redemption", redemption);
    const query = params.toString();
    const response = await fetch(url + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
