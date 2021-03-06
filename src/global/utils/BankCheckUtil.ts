import { ForbiddenException } from "@nestjs/common"
import { AccountConst } from "../constants/account.const"
import { BankEndPoint } from "../constants/bankEndPoint.const";
import { ActionCheckEnum } from "../enums/actionCheck.enum";

export const bankCheckUtil = (accountId: string, type: ActionCheckEnum): BankEndPoint => {

  if (accountId.length < 3) {

    throw new ForbiddenException('잘못된 계좌번호입니다');
  }

  if (type === ActionCheckEnum.POST) {
    switch (accountId.slice(0, 3)) {
      case AccountConst.JB:
        return BankEndPoint.JB;
      case AccountConst.HY:
        return BankEndPoint.HY;
      default:
        throw new ForbiddenException('잘못된 계좌번호 입니다');
    }
  }

  switch (accountId.slice(0, 3)) {
    case AccountConst.JB:
      return BankEndPoint.GJB;
    case AccountConst.HY:
      return BankEndPoint.GHY;
    default:
      throw new ForbiddenException('잘못된 계좌번호 입니다');
  }
}