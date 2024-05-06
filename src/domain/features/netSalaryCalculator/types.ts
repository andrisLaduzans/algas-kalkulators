export interface UserInputNetSalaryCalc {
  grossSalary: number;
  isTaxBookSubmittedWithEmployer: boolean;
  numberOfDependents: number;
  monthlyNonTaxableMinimum: number | null;
}

export interface UserInputNetSalaryCalcData extends UserInputNetSalaryCalc {
  id: string;
  updatedAt: number;
}

export interface NetSalaryCalcResult {
  monthlyNonTaxableMinimum: number;
  reliefForDependents: number;
  vsaoi: number;
  incomeTax: number;
  netSalary: number;
}

export interface NetSalaryFormFields {
  grossSalary: string;
  isTaxBookSubmittedWithEmployer: boolean;
  numberOfDependents?: string | null;
  isUseProvisionalNonTaxableMinimumCalculation: boolean;
  monthlyNonTaxableMinimum?: string | null;
}
