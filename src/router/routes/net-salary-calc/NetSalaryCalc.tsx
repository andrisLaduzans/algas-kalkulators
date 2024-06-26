import { getProvisionalNonTaxableMinimum } from "../../../domain/features/netSalaryCalculator/calculateNetSalary/helpers/getProvisionalNonTaxableMinimum";
import { TextInput } from "../../../components/formInputs/TextInput";
import { CheckboxInput } from "../../../components/formInputs/CheckBoxInput";
import { UncontrolledTextInput } from "../../../components/formInputs/UncontrolledTextInput";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import {
  validateCurrencyInput,
  validateNaturalNumberInput,
} from "../../../domain/forms/inputValidators";
import { NetSalaryFormFields } from "../../../domain/features/netSalaryCalculator/types";
import { useNetSalaryCalcForm } from "../../../domain/features/netSalaryCalculator/useNetSalaryCalcForm";
import { verifyInputData } from "../../../domain/features/netSalaryCalculator/verifyInputData";
import { mapSubmitData } from "../../../domain/features/netSalaryCalculator/mapSubmitData";
import { WarningAlertModal } from "../../../components/feedback/WarningAlertModal";
import { netSalaryCalcApi } from "../../../api/netSalaryCalcApi";
import { useNavigate } from "react-router-dom";
import { CalcContainerCard } from "./components/CalcContainerCard";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

export const NetSalaryCalc = () => {
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

  const navigate = useNavigate();

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

    const userInput = await netSalaryCalcApi().create(userInputNetSalaryCalc);
    if (!userInput) {
      setFormError({
        severity: "error",
        message: `Neizdevās saglabāt formas datus!
        Lūdzu pārbaudi savus ievadītos parametrus.
        Vai arī pārbaudi vai tev ir ieslēgta iespēja izmantot
        localStorage: šī aplikācija izmanto lokālos pārlūka datus.
        Bez pieejas localStorage šī aplikācija nedarbosies`,
      });
      return;
    }

    navigate(`/net-salary-calc/${userInput.id}`);
  };

  return (
    <Stack sx={{ pt: 6 }}>
      <Typography
        variant="h1"
        style={{
          fontSize: 32,
          fontWeight: "light",
        }}
      >
        Algas Kalkulators
      </Typography>

      <Typography
        variant="h2"
        sx={(theme) => ({
          fontSize: 16,
          fontWeight: "bold",
          color: theme.palette.text.secondary,
          mb: 6,
        })}
      >
        2024 gadam
      </Typography>

      <CalcContainerCard
        headerProps={{
          text: "Neto Algas Aprēķins",
          icon: CalculateOutlinedIcon,
        }}
        sx={{ mb: 6 }}
      >
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          style={{ paddingTop: 24, paddingLeft: 24 }}
        >
          <WarningAlertModal
            severity="warning"
            isOpen={formError?.severity === "warning"}
            title={"Brīdinājums!"}
            description={formError?.message}
            primaryActionTitle={"Ignorēt un turpināt"}
            onPrimaryAction={handleSubmit((data) => onSubmit(data, true))}
            secondaryActionTitle={"Atcelt"}
            onSecondaryAction={() => setFormError(null)}
          />

          <WarningAlertModal
            severity="error"
            isOpen={formError?.severity === "error"}
            title={"Aplikācijas Kļūda!"}
            description={formError?.message}
            secondaryActionTitle={"Aizvērt"}
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
                  : getProvisionalNonTaxableMinimum(
                      parseFloat(grossSalaryValue)
                    )
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
      </CalcContainerCard>
    </Stack>
  );
};
