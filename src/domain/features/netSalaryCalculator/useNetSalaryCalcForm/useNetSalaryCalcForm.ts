import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { currencyFormatPattern } from "../../../../utils/regexPatterns";
import { errorMessage } from "../../../forms/errors";
import { NetSalaryFormFields } from "../types";
import * as yup from "yup";
import { ObjectSchema } from "yup";
import { useState } from "react";
import { FormError } from "../../../forms/types";

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
    .when("isUseProvisionalNonTaxableMinimumCalculation", {
      is: (value: boolean) => value === false,
      then: (schema) => schema.required(errorMessage.required),
      otherwise: (schema) => schema.nullable(),
    }),
});

export const useNetSalaryCalcForm = () => {
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

  const [formError, setFormError] = useState<FormError | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  return {
    handleSubmit,
    errors,
    control,
    isUseProvisionalNonTaxableMinimumCalculationValue,
    grossSalaryValue,
    formError,
    setFormError,
    loading,
    setLoading,
  };
};
