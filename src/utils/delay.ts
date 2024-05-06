export const delay = (ms = 2500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
