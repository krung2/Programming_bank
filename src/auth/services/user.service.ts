import { ForbiddenException, Injectable } from '@nestjs/common';
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
}
