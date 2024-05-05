import { NON_TAXABLE_MINIMUM_COEFFICIENT } from "../calculateNetSalary";

export const getProvisionalNonTaxableMinimum = (grossSalary: number) => {
  if (grossSalary >= 1800) {
    return 0;
  } else if (grossSalary <= 500) {
    return 500;
  }

  return parseFloat((grossSalary * NON_TAXABLE_MINIMUM_COEFFICIENT).toFixed(5));
};
