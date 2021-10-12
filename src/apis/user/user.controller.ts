import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IResUser } from "src/global/interfaces/IResUser";
import BaseResponse from "src/global/response/base.response";
import User from "./entities/user.entity";
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Get('/')
  async getAllUserCount(): Promise<BaseResponse<number>> {

    const countUsers: number = await this.userService.countAllUser();

    return new BaseResponse<number>(200, '모든 유저 수 불러오기 성공', countUsers);
  }

  @Get('/all')
  async getAllUserList(): Promise<BaseResponse<IResUser[]>> {

    const users: IResUser[] = await this.userService.getAllUser();

    return new BaseResponse<IResUser[]>(200, '모든 유저 조회 성공', users);
  }
}