import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

interface Props<FormFields extends FieldValues> {
  control: Control<FormFields>;
  name: Path<FormFields>;
  label: string;
  helperText?: string;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
}

export const TextInput = <FormFields extends FieldValues>({
  control,
  name,
  label,
  helperText,
  error,
  type,
}: Props<FormFields>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Fragment>
          <TextField {...field} label={label} error={!!error} type={type} />
          <FormHelperText error>{error ? error : ""}</FormHelperText>

          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </Fragment>
      )}
    />
  );
};
