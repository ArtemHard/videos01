import { ValidationError } from "../../drivers/validation/types/validationErrors";

export const createErrorMessages = (
  errors: ValidationError[], key?: string
): { [x: string]: ValidationError[] } => {
    const validKey = !!key ? key : errors.length > 1 ? 'errorsMessages' : 'errorMessage';
  return { [validKey]: errors };
};
