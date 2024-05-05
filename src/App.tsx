import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ObjectSchema } from "yup";
import { UserInputNetSalaryCalc } from "./domain/models";
import { getProvisionalNonTaxableMinimum } from "./domain/features/netSalaryCalculator/calculateNetSalary/helpers/getProvisionalNonTaxableMinimum";
import { errorMessage } from "./domain/forms/errors";

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
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NetSalaryFormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      isTaxBookSubmittedWithEmployer: true,
      isUseProvisionalNonTaxableMinimumCalculation: true,
    },
    mode: "all",
  });

  const isUseProvisionalNonTaxableMinimumCalculationValue = watch(
    "isUseProvisionalNonTaxableMinimumCalculation"
  );
  const grossSalaryValue = (watch("grossSalary") as number) || undefined;

  const onSubmit = (data: NetSalaryFormFields) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="grossSalary">Bruto Alga</label>
      </div>
      <input {...register("grossSalary")} type="number" />
      <p>{errors.grossSalary?.message}</p>

      <input {...register("isTaxBookSubmittedWithEmployer")} type="checkbox" />
      <label htmlFor="isTaxBookSubmittedWithEmployer">
        Algas Grāmatiņa ir nodota darba devējam
      </label>
      <p>{errors.isTaxBookSubmittedWithEmployer?.message}</p>

      <div>
        <label htmlFor="numberOfDependents">Apgādājamo skaits</label>
      </div>
      <input {...register("numberOfDependents")} type="number" />
      <p>{errors.numberOfDependents?.message}</p>

      <input
        {...register("isUseProvisionalNonTaxableMinimumCalculation")}
        type="checkbox"
      />
      <label htmlFor="isUseProvisionalNonTaxableMinimumCalculation">
        Izmantot Neapliekamā minimuma auto-kalkulāciju
      </label>
      <p>{errors.isUseProvisionalNonTaxableMinimumCalculation?.message}</p>

      <div>
        <label htmlFor="monthlyNonTaxableMinimum">
          Napliekamais Minimums (0 - 500 Eur)
        </label>
      </div>

      {isUseProvisionalNonTaxableMinimumCalculationValue ? (
        <p>
          {grossSalaryValue === undefined
            ? 0
            : getProvisionalNonTaxableMinimum(grossSalaryValue)}
        </p>
      ) : (
        <input {...register("monthlyNonTaxableMinimum")} type="number" />
      )}

      <p>{errors.monthlyNonTaxableMinimum?.message}</p>

      <input type="submit" />
    </form>
  );
}
