import { Injectable } from '@nestjs/common';
import EasyLoginRegisterDto from './dto/easyLoginRegister.dto';
import Authentication from './entities/authentication.entity';
import User from './entities/user.entity';
import AuthenticationRepository from './repositories/auth.repository';

@Injectable()
export class AuthService {

  constructor(
    private readonly authenticationRepository: AuthenticationRepository
  ) { }

  public easyLoginRegister(user: User, easyLoginRegisterDto: EasyLoginRegisterDto): Promise<Authentication> {

    return this.authenticationRepository.save({
      user,
      key: easyLoginRegisterDto.key,
    });
  }
}