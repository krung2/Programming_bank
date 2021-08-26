import { IsNumber, IsString } from "class-validator";

export class EnviromentVariables {

  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_DATABASE_NAME: string;

  @IsString()
  REDIS_HOST: string;

  @IsNumber()
  REDIS_PORT: number;
}