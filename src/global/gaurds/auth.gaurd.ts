import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import User from "src/auth/entities/user.entity";
import { TokenService } from "src/token/token.service";
import { UserService } from "src/user/user.service";
import { Container } from "typeorm-typedi-extensions";
import { IToken } from "../interfaces/IToken";
import AuthRequest from "../types/AuthRequest";
import { isDiffrentUtil } from "../utils/Comparison.util";

@Injectable()
export default class AuthGaurd implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request: AuthRequest = context.switchToHttp().getRequest();

    const token: string | string[] = request.headers['Authorization'];

    if (token === undefined) {

      throw new UnauthorizedException('토큰이 전송되지 않았습니다');
    }

    if (Array.isArray(token)) {

      throw new UnauthorizedException('잘못된 토큰입니다');
    }

    const { iss, sub, userPhone }: IToken = await Container.get(TokenService).verifyToken(token);

    if (isDiffrentUtil(iss, 'kaBank') && isDiffrentUtil(sub, 'token')) {

      throw new UnauthorizedException('토큰이 위조되었습니다');
    }

    const user: User = await Container.get(UserService).findUserByPhone(userPhone);

    request.user = user;

    return true;
  }
}