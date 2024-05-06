import { NetSalaryFormFields, UserInputNetSalaryCalc } from "./types";

export const mapSubmitData = (
  inputs: NetSalaryFormFields
): UserInputNetSalaryCalc => {
  let monthlyNonTaxableMinimum = null;

  if (!inputs.isUseProvisionalNonTaxableMinimumCalculation) {
    monthlyNonTaxableMinimum = inputs.monthlyNonTaxableMinimum
      ? parseFloat(inputs.monthlyNonTaxableMinimum)
      : null;
  }

  return {
    grossSalary: parseFloat(inputs.grossSalary),
    isTaxBookSubmittedWithEmployer: inputs.isTaxBookSubmittedWithEmployer,
    numberOfDependents: inputs.numberOfDependents
      ? parseInt(inputs.numberOfDependents)
      : 0,
    monthlyNonTaxableMinimum,
  };
};
