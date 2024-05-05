import { NetSalaryCalcResult, UserInputNetSalaryCalc } from "../../../models";
import { calculateNetSalary } from "./calculateNetSalary";

describe("calculateNetSalary test", () => {
  it("should calculate gross 700, nonTaxable: 500, dependents: 0, isTaxBookSubmittedWithEmployer: true", () => {
    const input: UserInputNetSalaryCalc = {
      grossSalary: 700,
      isTaxBookSubmittedWithEmployer: true,
      monthlyNonTaxableMinimum: 500,
      numberOfDependents: 0,
    };

    const result = calculateNetSalary(input);

    /**
     * Piemērojamais neapliekamais minimums*: 500.00
     * Atvieglojums par apgādībā esošām personām:0.00
     * Valsts sociālās apdrošināšanas obligātās iemaksas:73.50
     * Iedzīvotāju ienākumu nodoklis:25.30
     * Ikmēneša neto alga ("uz rokas"):601.20
     */
    const expected: NetSalaryCalcResult = {
      incomeTax: 25.3,
      monthlyNonTaxableMinimum: 500,
      netSalary: 601.2,
      reliefForDependents: 0,
      vsaoi: 73.5,
    };

    expect(result).toEqual(expected);
  });

  it("should calculate gross 1700, nonTaxable: 0, dependents: 2, isTaxBookSubmittedWithEmployer: true", () => {
    const input: UserInputNetSalaryCalc = {
      grossSalary: 1700,
      isTaxBookSubmittedWithEmployer: true,
      monthlyNonTaxableMinimum: 0,
      numberOfDependents: 2,
    };

    const result = calculateNetSalary(input);

    /**
     * Piemērojamais neapliekamais minimums*: 0.00
     * Atvieglojums par apgādībā esošām personām:500.00
     * Valsts sociālās apdrošināšanas obligātās iemaksas:178.50
     * Iedzīvotāju ienākumu nodoklis:205.29
     * Ikmēneša neto alga ("uz rokas"):1 316.21
     */
    const expected: NetSalaryCalcResult = {
      monthlyNonTaxableMinimum: 0,
      reliefForDependents: 500,
      vsaoi: 178.5,
      incomeTax: 205.29,
      netSalary: 1_316.21,
    };

    expect(result).toEqual(expected);
  });

  it("should correctly calculate dependents releaf overflow", () => {
    const input: UserInputNetSalaryCalc = {
      grossSalary: 1700,
      isTaxBookSubmittedWithEmployer: true,
      monthlyNonTaxableMinimum: 0,
      numberOfDependents: 9,
    };

    const result = calculateNetSalary(input);

    /**
     * Piemērojamais neapliekamais minimums*:0.00
     * Atvieglojums par apgādībā esošām personām:2 250.00
     * Valsts sociālās apdrošināšanas obligātās iemaksas:178.50
     * Iedzīvotāju ienākumu nodoklis:0.00
     * Ikmēneša neto alga ("uz rokas"):1 521.50
     */
    const expected: NetSalaryCalcResult = {
      monthlyNonTaxableMinimum: 0,
      reliefForDependents: 2_250,
      vsaoi: 178.5,
      incomeTax: 0,
      netSalary: 1_521.5,
    };

    expect(result).toEqual(expected);
  });

  it("should correctly calculate high tier salary over 78100.01(yearly)", () => {
    const input: UserInputNetSalaryCalc = {
      grossSalary: 7000,
      isTaxBookSubmittedWithEmployer: true,
      monthlyNonTaxableMinimum: 0,
      numberOfDependents: 0,
    };

    const result = calculateNetSalary(input);

    const expected: NetSalaryCalcResult = {
      monthlyNonTaxableMinimum: 0,
      reliefForDependents: 0,
      vsaoi: 735,
      incomeTax: 1_412.99,
      netSalary: 4_852.01,
    };

    expect(result).toEqual(expected);
  });

  it("should provide provisional nonTaxableAmount if user has not provided anything", () => {
    const input: UserInputNetSalaryCalc = {
      grossSalary: 500,
      isTaxBookSubmittedWithEmployer: true,
      monthlyNonTaxableMinimum: null,
      numberOfDependents: 0,
    };

    const result = calculateNetSalary(input);

    const expected: NetSalaryCalcResult = {
      monthlyNonTaxableMinimum: 500,
      reliefForDependents: 0,
      vsaoi: 52.5,
      incomeTax: 0,
      netSalary: 447.50,
    };

    expect(result).toEqual(expected);
  });
});
