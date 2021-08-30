import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import UserRepository from './repositories/user.repository';
import User from 'src/user/entities/user.entity';
import LoginDto from 'src/auth/dto/login.dto';
import RegisterDto from 'src/auth/dto/register.dto';
import LoginResponseDto from 'src/auth/responses/loginRes.dto';
import { validationData } from 'src/global/utils/validationData.util';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) { }

  public async register(registerDto: RegisterDto): Promise<void> {

    const user: User | undefined = await this.userRepository.findByPhone(registerDto.phone);

    if (validationData(user)) {

      throw new ForbiddenException('중복된 계정입니다');
    }

    await this.userRepository.save(registerDto);
  }

  public async login(loginDto: LoginDto): Promise<LoginResponseDto> {

    const user: User | undefined = await this.userRepository.findById(loginDto.id, loginDto.pw);

    if (validationData(user)) {

      throw new UnauthorizedException('id 또는 pw가 일치하지 않습니다');
    }

    const token: string = this.tokenService.generateAccessToken(user.phone);
    const refreshToken: string = this.tokenService.generateRefreshToken(user.phone);

    return new LoginResponseDto(user, token, refreshToken);
  }

  public async findUserByPhone(userPhone: string): Promise<User> {

    const user: User | undefined = await this.userRepository.findByPhone(userPhone);

    if (validationData(user)) {

      throw new UnauthorizedException('존재하지 않는 유저입니다');
    }

    return user;
  }
}
