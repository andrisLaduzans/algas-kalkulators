import { NetSalaryCalcResult, UserInputNetSalaryCalc } from "../../../models";
import { getProvisionalNonTaxableMinimum } from "./helpers/getProvisionalNonTaxableMinimum";

const MANDATORY_SOCIAL_INSURANCE_TAX_RATE = 10.5;
const LOW_TIER_TAX_RATE_PERCENTAGE = 0.2;
const MID_TIER_TAX_RATE_PERCENTAGE = 0.23;
const MID_TIER_GROSS_SALARY_THRESHOLD = 1667;
export const NON_TAXABLE_MINIMUM_COEFFICIENT = 0.38462;

export const calculateNetSalary = (
  input: UserInputNetSalaryCalc
): NetSalaryCalcResult => {
  const vsaoi = (MANDATORY_SOCIAL_INSURANCE_TAX_RATE / 100) * input.grossSalary;
  const incomeAfterVsaoi = input.grossSalary - vsaoi;

  let nonTaxableMinimum =
    input.monthlyNonTaxableMinimum === null ||
    input.monthlyNonTaxableMinimum === undefined
      ? getProvisionalNonTaxableMinimum(input.grossSalary)
      : input.monthlyNonTaxableMinimum;

  if (!input.isTaxBookSubmittedWithEmployer) {
    nonTaxableMinimum = 0;
  }

  const reliefForDependents = (input.numberOfDependents || 0) * 250;
  let taxableSum = incomeAfterVsaoi - nonTaxableMinimum - reliefForDependents;

  let incomeTax = 0;
  if (taxableSum > 0) {
    if (!input.isTaxBookSubmittedWithEmployer) {
      incomeTax =
        input.grossSalary * MID_TIER_TAX_RATE_PERCENTAGE -
        vsaoi * LOW_TIER_TAX_RATE_PERCENTAGE;
    } else {
      let lowIncomeTax = 0;
      let midIncomeTax = 0;
      const hightIncomeTax = 0;
      let incomeOverflow = 0;

      if (input.grossSalary > MID_TIER_GROSS_SALARY_THRESHOLD) {
        incomeOverflow = input.grossSalary - MID_TIER_GROSS_SALARY_THRESHOLD;

        taxableSum -= incomeOverflow;

        midIncomeTax = incomeOverflow * MID_TIER_TAX_RATE_PERCENTAGE;
      }

      lowIncomeTax =
        Math.min(MID_TIER_GROSS_SALARY_THRESHOLD, taxableSum) *
        LOW_TIER_TAX_RATE_PERCENTAGE;

      incomeTax = lowIncomeTax + midIncomeTax + hightIncomeTax;
    }
  }

  const netSalary = input.grossSalary - vsaoi - incomeTax;

  const result: NetSalaryCalcResult = {
    incomeTax: parseFloat(incomeTax.toFixed(2)),
    monthlyNonTaxableMinimum: parseFloat(nonTaxableMinimum.toFixed(2)),
    netSalary: parseFloat(netSalary.toFixed(2)),
    reliefForDependents: parseFloat(reliefForDependents.toFixed(2)),
    vsaoi: parseFloat(vsaoi.toFixed(2)),
  };

  return result;
};
