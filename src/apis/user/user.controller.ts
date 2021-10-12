import { Controller, Get, HttpCode } from "@nestjs/common";
import BaseResponse from "src/global/response/base.response";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Get('/')
  @HttpCode(200)
  async easyLogin(): Promise<BaseResponse<number>> {

    const countUsers: number = await this.userService.countAllUser();

    return new BaseResponse<number>(200, '모든 유저 수 불러오기 성공', countUsers);
  }
}