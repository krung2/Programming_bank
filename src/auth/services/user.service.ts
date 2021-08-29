import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import LoginDto from '../dto/login.dto';
import RegisterDto from '../dto/register.dto';
import User from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async register(registerDto: RegisterDto): Promise<void> {

    const user: User | undefined = await this.userRepository.findByPhone(registerDto.phone);

    if (user !== undefined) {

      throw new ForbiddenException('중복된 계정입니다');
    }

    await this.userRepository.save(registerDto);
  }

  public async login(loginDto: LoginDto): Promise<User> {

    const user: User | undefined = await this.userRepository.findById(loginDto.id, loginDto.pw);

    if (user === undefined) {

      throw new UnauthorizedException('id 또는 pw가 일치하지 않습니다');
    }

    return user;
  }
}
