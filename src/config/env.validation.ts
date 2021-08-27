import { plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from "class-validator";
import { EnviromentVariables } from './env';

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig: EnviromentVariables = plainToClass(
    EnviromentVariables,
    config,
    { enableImplicitConversion: true },
  );

  const errors: ValidationError[] = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length === 0) {

    return validatedConfig;
  }

  throw new Error(errors.toString());
}
