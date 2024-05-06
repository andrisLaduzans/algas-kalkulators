import { FormError } from "../../forms/types";
import { UserInputNetSalaryCalc } from "./types";

export const verifyInputData = (
  inputs: UserInputNetSalaryCalc
): FormError | undefined => {
  if (inputs.monthlyNonTaxableMinimum !== null) {
    if (inputs.grossSalary <= 500 && inputs.monthlyNonTaxableMinimum < 500) {
      return {
        severity: "warning",
        message: `Lūdzu pārliecinieties par ievadītajām vērtībām! Algai, kas ir zem 500 EUR, neapliekamais minimums vajadzētu būt maksimālajai vērtībāi: 500 EUR`,
      };
    }

    if (inputs.grossSalary >= 1800 && inputs.monthlyNonTaxableMinimum > 0) {
      return {
        severity: "warning",
        message: `Lūdzu pārliecinieties par ievadītajām vērtībām! Algai, kas ir virs 1800 EUR, neapliekamais minimums vajadzētu būt 0 EUR`,
      };
    }
  }
};
