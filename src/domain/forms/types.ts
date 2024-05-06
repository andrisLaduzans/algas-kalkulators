export type ErrorSeverity = "warning" | "error";
export interface FormError {
  severity: ErrorSeverity;
  message: string;
}
