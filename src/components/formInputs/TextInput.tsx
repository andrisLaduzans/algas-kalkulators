import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

interface Props<FormFields extends FieldValues> {
  control: Control<FormFields>;
  name: Path<FormFields>;
  label: string;
  helperText?: string;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  validateInput?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined;
  required?: boolean;
}

export const TextInput = <FormFields extends FieldValues>({
  control,
  name,
  label,
  helperText,
  error,
  type,
  validateInput,
  inputMode,
  required,
}: Props<FormFields>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Fragment>
          <TextField
            {...field}
            onChange={(event) => {
              const validatedEvent = validateInput
                ? validateInput(event)
                : event;
              if (validatedEvent) {
                field.onChange(validatedEvent);
              }
            }}
            label={`${label}${required ? " *" : ""}`}
            error={!!error}
            type={type}
            inputMode={inputMode}
          />
          <FormHelperText error>{error ? error : ""}</FormHelperText>

          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </Fragment>
      )}
    />
  );
};
