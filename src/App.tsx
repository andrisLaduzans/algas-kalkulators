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
import { WarningAlertModal } from "./components/feedback/WarningAlertModal";

export default function App() {
  const {
    control,
    errors,
    grossSalaryValue,
    handleSubmit,
    isUseProvisionalNonTaxableMinimumCalculationValue,
    formError,
    setFormError,
  } = useNetSalaryCalcForm();

  const onSubmit = (data: NetSalaryFormFields, ignoreVerify?: boolean) => {
    const userInputNetSalaryCalc = mapSubmitData(data);

    if (!ignoreVerify) {
      const warnings = verifyInputData(userInputNetSalaryCalc);

      if (warnings) {
        setFormError(warnings || null);
        return;
      }
    }

    alert(`Dati submitoti:
    ${JSON.stringify(userInputNetSalaryCalc, null, 2)}`);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      style={{ paddingTop: 24, paddingLeft: 24 }}
    >
      <WarningAlertModal
        isOpen={formError?.severity === "warning"}
        title={"Brīdinājums!"}
        description={formError?.message}
        primaryActionTitle={"Ignorēt un turpināt"}
        onPrimaryAction={handleSubmit((data) => onSubmit(data, true))}
        secondaryActionTitle={"Atcelt"}
        onSecondaryAction={() => setFormError(null)}
      />

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
