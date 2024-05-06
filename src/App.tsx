import { getProvisionalNonTaxableMinimum } from "./domain/features/netSalaryCalculator/calculateNetSalary/helpers/getProvisionalNonTaxableMinimum";
import { TextInput } from "./components/formInputs/TextInput";
import { CheckboxInput } from "./components/formInputs/CheckBoxInput";
import { UncontrolledTextInput } from "./components/formInputs/UncontrolledTextInput";
import { Button, CircularProgress, Typography } from "@mui/material";
import {
  validateCurrencyInput,
  validateNaturalNumberInput,
} from "./domain/forms/inputValidators";
import { NetSalaryFormFields } from "./domain/features/netSalaryCalculator/types";
import { useNetSalaryCalcForm } from "./domain/features/netSalaryCalculator/useNetSalaryCalcForm";
import { verifyInputData } from "./domain/features/netSalaryCalculator/verifyInputData";
import { mapSubmitData } from "./domain/features/netSalaryCalculator/mapSubmitData";
import { WarningAlertModal } from "./components/feedback/WarningAlertModal";
import { netSalaryCalcApi } from "./api/netSalaryCalcApi";

export default function App() {
  const {
    control,
    errors,
    grossSalaryValue,
    handleSubmit,
    isUseProvisionalNonTaxableMinimumCalculationValue,
    formError,
    setFormError,
    loading,
    setLoading,
  } = useNetSalaryCalcForm();

  const onSubmit = async (
    data: NetSalaryFormFields,
    ignoreVerify?: boolean
  ) => {
    setLoading(true);

    const userInputNetSalaryCalc = mapSubmitData(data);

    if (!ignoreVerify) {
      const warnings = verifyInputData(userInputNetSalaryCalc);

      if (warnings) {
        setFormError(warnings || null);
        setLoading(false);
        return;
      }
    }

    await netSalaryCalcApi().create(userInputNetSalaryCalc);

    setLoading(false);
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
        required
        disabled={loading}
      />

      <CheckboxInput<NetSalaryFormFields>
        control={control}
        name={"isTaxBookSubmittedWithEmployer"}
        label="Algas Grāmatiņa ir nodota darba devējam"
        disabled={loading}
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
        disabled={loading}
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
        disabled={loading}
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
          required
          disabled={loading}
        />
      )}

      <div>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          endIcon={loading && <CircularProgress size={16} />}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>

      <Typography variant="caption">
        * - lauki ar atzīmi "*" ir obligāti jāaizpilda
      </Typography>
    </form>
  );
}
