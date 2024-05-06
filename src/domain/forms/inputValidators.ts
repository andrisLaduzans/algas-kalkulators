export const validateCurrencyInput = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  let value = event.target.value.replace(/,/g, ".");
  value = value.replace(/[^0-9.]/g, "");

  const parts = value.split(".");

  if (parts.length > 1) {
    const decimals = parts.slice(1).join("");

    value = parts[0] + "." + decimals.substring(0, 2);
  } else {
    value = parts.join(".");
  }

  event.target.value = value;
  return event;
};

export const validateNaturalNumberInput = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const numbersOnlyValue = event.target.value.replace(/\D/g, "");

  const validNumberValue = parseInt(numbersOnlyValue, 10);

  event.target.value = isNaN(validNumberValue)
    ? ""
    : validNumberValue.toString();

  return event;
};
