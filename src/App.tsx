import { getProvisionalNonTaxableMinimum } from "./domain/features/netSalaryCalculator/calculateNetSalary/helpers/getProvisionalNonTaxableMinimum";
import { TextInput } from "./components/formInputs/TextInput";
import { CheckboxInput } from "./components/formInputs/CheckBoxInput";
import { UncontrolledTextInput } from "./components/formInputs/UncontrolledTextInput";
import { Button } from "@mui/material";
import {
  validateCurrencyInput,
  validateNaturalNumberInput,
} from "./domain/forms/inputValidators";
import { NetSalaryFormFields } from "./domain/features/netSalaryCalculator/types";
import { useNetSalaryCalcForm } from "./domain/features/netSalaryCalculator/useNetSalaryCalcForm";
import { verifyInputData } from "./domain/features/netSalaryCalculator/verifyInputData";
import { mapSubmitData } from "./domain/features/netSalaryCalculator/mapSubmitData";

export default function App() {
  const {
    control,
    errors,
    grossSalaryValue,
    handleSubmit,
    isUseProvisionalNonTaxableMinimumCalculationValue,
  } = useNetSalaryCalcForm();

  const onSubmit = (data: NetSalaryFormFields) => {
    const userInputNetSalaryCalc = mapSubmitData(data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const warnings = verifyInputData(userInputNetSalaryCalc);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ paddingTop: 24, paddingLeft: 24 }}
    >
      <TextInput<NetSalaryFormFields>
        control={control}
        name={"grossSalary"}
        label={"Bruto Alga"}
        helperText={`Alga ko Tu saņem "uz papīra"`}
        error={errors.grossSalary?.message}
        type="text"
        inputMode="decimal"
        validateInput={validateCurrencyInput}
      />

      <CheckboxInput<NetSalaryFormFields>
        control={control}
        name={"isTaxBookSubmittedWithEmployer"}
        label="Algas Grāmatiņa ir nodota darba devējam"
      />

      <TextInput<NetSalaryFormFields>
        control={control}
        name={"numberOfDependents"}
        label={"Apgādājamo skaits"}
        helperText="Atvieglojumi: 250Eur par apgādājamo"
        error={errors.numberOfDependents?.message}
        type="text"
        inputMode="numeric"
        validateInput={validateNaturalNumberInput}
      />

      <CheckboxInput<NetSalaryFormFields>
        control={control}
        name={"isUseProvisionalNonTaxableMinimumCalculation"}
        label="Izmantot Neapliekamā minimuma auto-kalkulāciju"
        helperText={
          isUseProvisionalNonTaxableMinimumCalculationValue
            ? "Izmanto mūsu provizorisko kalkulāciju"
            : "Ievadi precīzu neapliekamā minimuma summu"
        }
      />

      {isUseProvisionalNonTaxableMinimumCalculationValue ? (
        <UncontrolledTextInput
          value={
            isNaN(parseFloat(grossSalaryValue))
              ? "0"
              : getProvisionalNonTaxableMinimum(parseFloat(grossSalaryValue))
          }
          label={"Neapliekamais Minimums:"}
          helperText="0 - 500 EUR (auto)"
          disabled
        />
      ) : (
        <TextInput<NetSalaryFormFields>
          control={control}
          name={"monthlyNonTaxableMinimum"}
          label={"Napliekamais Minimums"}
          helperText="0 - 500 EUR"
          error={errors.monthlyNonTaxableMinimum?.message}
          type="text"
          inputMode="decimal"
          validateInput={validateCurrencyInput}
        />
      )}

      <div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </div>
    </form>
  );
}
