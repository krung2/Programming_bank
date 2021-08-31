import { Injectable } from '@nestjs/common';
import ReceiveRepository from './repositories/receive.repository';
import SendRepository from './repositories/sned.repository';

@Injectable()
export class RemittanceService {

  constructor(
    private readonly receiveRepository: ReceiveRepository,
    private readonly sendRepository: SendRepository,
  ) { }


}
