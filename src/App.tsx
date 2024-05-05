import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ObjectSchema } from "yup";
import { UserInputNetSalaryCalc } from "./domain/models";
import { getProvisionalNonTaxableMinimum } from "./domain/features/netSalaryCalculator/calculateNetSalary/helpers/getProvisionalNonTaxableMinimum";
import { errorMessage } from "./domain/forms/errors";
import { TextInput } from "./components/formInputs/TextInput";
import { CheckboxInput } from "./components/formInputs/CheckBoxInput";
import { UncontrolledTextInput } from "./components/formInputs/UncontrolledTextInput";
import { Button } from "@mui/material";

interface NetSalaryFormFields extends UserInputNetSalaryCalc {
  isUseProvisionalNonTaxableMinimumCalculation: boolean;
}

// TODO: handle decimals count after coma handle large numbers
const schema: ObjectSchema<NetSalaryFormFields> = yup.object({
  grossSalary: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(errorMessage.required)
    .positive(errorMessage.number.positive),
  isTaxBookSubmittedWithEmployer: yup.boolean().required(),
  numberOfDependents: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .min(0, ({ min }) =>
      errorMessage.number.min.replace(/{{MIN}}/, min.toString())
    ),
  isUseProvisionalNonTaxableMinimumCalculation: yup.boolean().required(),
  monthlyNonTaxableMinimum: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .min(0, ({ min }) =>
      errorMessage.number.min.replace(/{{MIN}}/, min.toString())
    )
    .max(500, ({ max }) =>
      errorMessage.number.max.replace(/{{MAX}}/, max.toString())
    ),
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
      grossSalary: 0,
      numberOfDependents: 0,
      isTaxBookSubmittedWithEmployer: true,
      isUseProvisionalNonTaxableMinimumCalculation: true,
      monthlyNonTaxableMinimum: 0,
    },
    mode: "all",
  });

  const isUseProvisionalNonTaxableMinimumCalculationValue = watch(
    "isUseProvisionalNonTaxableMinimumCalculation"
  );
  const grossSalaryValue = (watch("grossSalary") as number) || undefined;

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
        type="number"
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
        type="number"
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
            grossSalaryValue === undefined
              ? 0
              : getProvisionalNonTaxableMinimum(grossSalaryValue)
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
          type="number"
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
