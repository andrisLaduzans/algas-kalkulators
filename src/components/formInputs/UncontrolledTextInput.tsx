import TextField from "@mui/material/TextField";

interface Props {
  value: string | number;
  disabled?: boolean;
  label: string;
  helperText?: string;
}

export const UncontrolledTextInput = ({
  value,
  disabled,
  label,
  helperText,
}: Props) => {
  return (
    <TextField
      label={label}
      variant="standard"
      value={value}
      disabled={disabled}
      helperText={helperText}
      sx={{ display: "block" }}
    />
  );
};
