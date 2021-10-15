import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Token } from "src/global/decorators/token.decorators";
import AuthGaurd from "src/global/gaurds/auth.gaurd";
import { IResUser } from "src/global/interfaces/IResUser";
import BaseResponse from "src/global/response/base.response";
import User from "./entities/user.entity";
import { UserInfoResponse } from "./response/userInfoRes.dto";
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

  @Get('/my')
  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: '내 정보 조회 성공',
    type: UserInfoResponse,
  })
  async getMyInfo(
    @Token() user: User,
  ): Promise<BaseResponse<User>> {

    const userInfo: User = await this.userService.findUserByPhone(user.phone);

    return new BaseResponse<User>(200, '내 정보 불러오기 성공', userInfo);
  }

  @Get('/all')
  async getAllUserList(): Promise<BaseResponse<IResUser[]>> {

    const users: IResUser[] = await this.userService.getAllUser();

    return new BaseResponse<IResUser[]>(200, '모든 유저 조회 성공', users);
  }
}