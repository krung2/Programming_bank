import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import ReceiveRepository from './repositories/receive.repository';
import SendRepository from './repositories/sned.repository';

@Injectable()
export class RemittanceService {

  constructor(
    private readonly receiveRepository: ReceiveRepository,
    private readonly sendRepository: SendRepository,
    private readonly accountService: AccountService,
  ) { }


}
