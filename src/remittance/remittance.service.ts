import { ForbiddenException, Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import Account from 'src/account/entities/account.entity';
import { bankCheckUtil } from 'src/global/utils/BankCheckUtil';
import { isSameUtil } from 'src/global/utils/Comparison.util';
import SendMoneyDto from './dto/sendMoney.dto';
import ReceiveRepository from './repositories/receive.repository';
import SendRepository from './repositories/sned.repository';

@Injectable()
export class RemittanceService {

  constructor(
    private readonly receiveRepository: ReceiveRepository,
    private readonly sendRepository: SendRepository,
    private readonly accountService: AccountService,
  ) { }

  public async sendMoney(sendMoneyDto: SendMoneyDto): Promise<Account> {

    const { sendId, receiveId, money }: SendMoneyDto = sendMoneyDto;

    if (isSameUtil(sendId, receiveId)) {

      throw new ForbiddenException('자기 자신에게 보낼 수 없습니다');
    }

    const account: Account = await this.accountService.findAccountByAccountId(sendId);

    return this.accountService.sendMoney(
      bankCheckUtil(receiveId),
      account,
      receiveId,
      money,
    );
  }

  public async receiveMoney(sendMoneyDto: SendMoneyDto): Promise<Account> {

    const { sendId, receiveId, money } = sendMoneyDto;

    return this.accountService.receiveMoney(receiveId, money);
  }
}
