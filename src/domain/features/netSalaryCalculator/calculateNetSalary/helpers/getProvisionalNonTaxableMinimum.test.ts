import { getProvisionalNonTaxableMinimum } from "./getProvisionalNonTaxableMinimum";

describe("getProvisionalNonTaxableMinimum", () => {
  it("should give 0 for grossSalary > 1800", () => {
    const result = getProvisionalNonTaxableMinimum(1800);
    expect(result).toBe(0);
  });

  it("should give 500 if grossSalary less or equal 500", () => {
    const result = getProvisionalNonTaxableMinimum(500);
    expect(result).toBe(500);
  });

  it("should calculate everything else within boundaries", () => {
    const result = getProvisionalNonTaxableMinimum(700);
    expect(result).toBe(269.234);
  });
});
