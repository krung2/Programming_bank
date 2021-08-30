import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import User from "src/user/entities/user.entity";
import { TokenService } from "src/token/token.service";
import { UserService } from "src/user/user.service";
import { IToken } from "../interfaces/IToken";
import AuthRequest from "../types/AuthRequest";
import { isDiffrentUtil } from "../utils/Comparison.util";
import { validationData } from "../utils/validationData.util";

@Injectable()
export default class AuthGaurd implements CanActivate {

  constructor(
    private readonly tokenService: TokenService,
    private readonly userSerivce: UserService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request: AuthRequest = context.switchToHttp().getRequest();

    const token: string | string[] = request.headers['authorization'];

    if (validationData(token)) {

      throw new UnauthorizedException('토큰이 전송되지 않았습니다');
    }

    if (Array.isArray(token)) {

      throw new UnauthorizedException('잘못된 토큰입니다');
    }

    const cuttingToken: string[] = token.split('Bearer ');

    if (validationData(cuttingToken[0])) {

      throw new UnauthorizedException('잘못된 토큰입니다');
    }

    const { iss, sub, userPhone }: IToken = await this.tokenService.verifyToken(cuttingToken[1]);

    if (isDiffrentUtil(iss, 'kaBank') && isDiffrentUtil(sub, 'token')) {

      throw new UnauthorizedException('토큰이 위조되었습니다');
    }

    const user: User = await this.userSerivce.findUserByPhone(userPhone);

    request.user = user;

    return true;
  }
}