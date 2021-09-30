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
  DATABASE_DATABASE: string;

  @IsString()
  static JWT_SECRET: string;

  @IsString()
  JWT_EXPIRE: string;

  @IsString()
  JWT_REFRESH_EXPIRE: string;
}