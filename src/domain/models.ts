export interface UserInputNetSalaryCalc {
  grossSalary: number;
  isTaxBookSubmittedWithEmployer: boolean;
  numberOfDependents: number;
  monthlyNonTaxableMinimum: number | null;
}

export interface NetSalaryCalcResult {
  monthlyNonTaxableMinimum: number;
  reliefForDependents: number;
  vsaoi: number;
  incomeTax: number;
  netSalary: number;
}
