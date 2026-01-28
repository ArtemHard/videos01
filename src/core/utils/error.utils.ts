import { ValidationError } from "../../drivers/validation/types/validationErrors";

export const createErrorMessages = (
  errors: ValidationError[],
): { [x: string]: ValidationError[] } => {
    const key = errors.length > 1 ? 'errorMessages' : 'errorMessage';
  return { [key]: errors };
};
