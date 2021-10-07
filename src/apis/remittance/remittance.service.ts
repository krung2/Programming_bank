import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { sha512 } from 'js-sha512';
import { AccountService } from 'src/apis/account/account.service';
import Account from 'src/apis/account/entities/account.entity';
import { ActionCheckEnum } from 'src/global/enums/actionCheck.enum';
import { bankCheckUtil } from 'src/global/utils/BankCheckUtil';
import { isSameUtil } from 'src/global/utils/Comparison.util';
import ReceiveMoneyDto from './dto/receiveMoney.dto';
import SendMoneyDto from './dto/sendMoney.dto';
import Receive from './entities/receive.entity';
import Send from './entities/send.entity';
import ReceiveRepository from './repositories/receive.repository';
import SendRepository from './repositories/send.repository';

@Injectable()
export class RemittanceService {

  constructor(
    private readonly receiveRepository: ReceiveRepository,
    private readonly sendRepository: SendRepository,
    private readonly accountService: AccountService,
  ) { }

  public async sendMoney(sendMoneyDto: SendMoneyDto): Promise<Account> {

    const { sendAccountId, sendAccountPw, receiveAccountId, money }: SendMoneyDto = sendMoneyDto;

    if (isSameUtil(sendAccountId, receiveAccountId)) {

      throw new ConflictException('자기 자신에게 보낼 수 없습니다');
    }

    const account: Account = await this.accountService.findAccountByAccountIdWithPw(sendAccountId, sha512(sendAccountPw));
    const changeMoney: number = Number(account.money) - money;

    if (changeMoney < 0) {

      throw new ForbiddenException('잔액이 모자랍니다');
    }

    account.money = changeMoney;

    const createSendRecord: Send = this.sendRepository.create({
      reciverId: receiveAccountId,
      money,
    });
    createSendRecord.account = account;
    await this.sendRepository.save(createSendRecord);

    const sendResult: Account = await this.accountService.sendMoney(
      bankCheckUtil(receiveAccountId, ActionCheckEnum.POST),
      account,
      receiveAccountId,
      money,
    );

    return sendResult;
  }

  public async receiveMoney(receiveMoneyDto: ReceiveMoneyDto): Promise<Account> {

    const { sendAccountId, receiveAccountId, money } = receiveMoneyDto;

    const account: Account = await this.accountService.findAccountByAccountId(receiveAccountId);

    const createSendRecord: Receive = this.receiveRepository.create({
      senderId: sendAccountId,
      money,
    });
    createSendRecord.account = account;

    const receiveResult: Account = await this.accountService.receiveMoney(account, money);
    await this.receiveRepository.save(createSendRecord);

    return receiveResult;
  }

  public findSendRecordByAccountId(accountId: string): Promise<Send[]> {

    return this.sendRepository.findSendRecordByAccountId(accountId);
  }

  public findRecieveRecordByAccountId(accountId: string): Promise<Receive[]> {

    return this.receiveRepository.findReceiveRecordByAccountId(accountId);
  }
}
