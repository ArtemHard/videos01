import { ValidationError } from "../../drivers/validation/types/validationErrors";

export const createErrorMessages = (
  errors: ValidationError[],
): { errorMessages: ValidationError[] } => {
  return { errorMessages: errors };
};
