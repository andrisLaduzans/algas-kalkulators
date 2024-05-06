import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ObjectSchema } from "yup";
import { getProvisionalNonTaxableMinimum } from "./domain/features/netSalaryCalculator/calculateNetSalary/helpers/getProvisionalNonTaxableMinimum";
import { errorMessage } from "./domain/forms/errors";
import { TextInput } from "./components/formInputs/TextInput";
import { CheckboxInput } from "./components/formInputs/CheckBoxInput";
import { UncontrolledTextInput } from "./components/formInputs/UncontrolledTextInput";
import { Button } from "@mui/material";
import { currencyFormatPattern } from "./utils/regexPatterns";
import {
  validateCurrencyInput,
  validateNaturalNumberInput,
} from "./domain/forms/inputValidators";

interface NetSalaryFormFields {
  grossSalary: string;
  isTaxBookSubmittedWithEmployer: boolean;
  numberOfDependents?: string | null;
  isUseProvisionalNonTaxableMinimumCalculation: boolean;
  monthlyNonTaxableMinimum?: string | null;
}

const schema: ObjectSchema<NetSalaryFormFields> = yup.object({
  grossSalary: yup
    .string()
    .required(errorMessage.required)
    .test("grossSalary", errorMessage.number.invalidFormat, (value) =>
      currencyFormatPattern.test(value)
    )
    .test(
      "grossSalary",
      errorMessage.number.min.replace(/{{MIN}}/, "0"),
      (value) => parseFloat(value) > 0
    ),

  isTaxBookSubmittedWithEmployer: yup.boolean().required(),
  numberOfDependents: yup.string().nullable(),
  isUseProvisionalNonTaxableMinimumCalculation: yup.boolean().required(),
  monthlyNonTaxableMinimum: yup
    .string()
    .test("grossSalary", errorMessage.number.invalidFormat, (value) =>
      value ? currencyFormatPattern.test(value) : true
    )
    .test(
      "monthlyNonTaxableMinimum",
      errorMessage.number.min.replace(/{{MIN}}/, "0"),
      (value) => (value ? parseFloat(value) >= 0 : true)
    )
    .test(
      "monthlyNonTaxableMinimum",
      errorMessage.number.max.replace(/{{MAX}}/, "500"),
      (value) => (value ? parseFloat(value) <= 500 : true)
    )
    .nullable(),
});

export default function App() {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<NetSalaryFormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      grossSalary: "",
      numberOfDependents: "",
      isTaxBookSubmittedWithEmployer: true,
      isUseProvisionalNonTaxableMinimumCalculation: true,
      monthlyNonTaxableMinimum: "",
    },
    mode: "all",
  });

  const isUseProvisionalNonTaxableMinimumCalculationValue = watch(
    "isUseProvisionalNonTaxableMinimumCalculation"
  );
  const grossSalaryValue = watch("grossSalary");

  const onSubmit = (data: NetSalaryFormFields) => console.log(data);

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
