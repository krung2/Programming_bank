import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import Account from 'src/account/entities/account.entity';
import { bankCheckUtil } from 'src/global/utils/BankCheckUtil';
import { isSameUtil } from 'src/global/utils/Comparison.util';
import SendMoneyDto from './dto/sendMoney.dto';
import Receive from './entities/receive.entity';
import Send from './entities/send.entity';
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

    const { sendAccountId, receiveAccountId, money }: SendMoneyDto = sendMoneyDto;

    if (isSameUtil(sendAccountId, receiveAccountId)) {

      throw new ConflictException('자기 자신에게 보낼 수 없습니다');
    }

    const account: Account = await this.accountService.findAccountByAccountId(sendAccountId);

    const createSendRecord: Send = this.sendRepository.create({
      reciverId: receiveAccountId,
      money,
    });
    createSendRecord.account = account;
    await this.sendRepository.save(createSendRecord);

    return this.accountService.sendMoney(
      bankCheckUtil(receiveAccountId),
      account,
      receiveAccountId,
      money,
    );
  }

  public async receiveMoney(sendMoneyDto: SendMoneyDto): Promise<Account> {

    const { sendAccountId, receiveAccountId, money } = sendMoneyDto;

    const account: Account = await this.accountService.findAccountByAccountId(receiveAccountId);

    const createSendRecord: Receive = this.receiveRepository.create({
      senderId: sendAccountId,
      money,
    });
    createSendRecord.account = account;
    await this.sendRepository.save(createSendRecord);

    return this.accountService.receiveMoney(account, money);
  }
}
