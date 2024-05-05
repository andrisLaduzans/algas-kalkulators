import { FormHelperText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

interface Props<FormFields extends FieldValues> {
  control: Control<FormFields>;
  name: Path<FormFields>;
  label: string;
  helperText?: string;
  error?: string;
}

export const CheckboxInput = <FormFields extends FieldValues>({
  control,
  name,
  label,
  helperText,
}: Props<FormFields>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { defaultValues } }) => (
        <Fragment>
          <FormControlLabel
            {...field}
            control={
              <Checkbox {...field} defaultChecked={defaultValues?.[name]} />
            }
            label={label}
          />

          <FormHelperText>{helperText}</FormHelperText>
        </Fragment>
      )}
    />
  );
};
