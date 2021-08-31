import { ForbiddenException } from "@nestjs/common"
import { AccountConst } from "../constants/account.const"
import { BankEndPoint } from "../constants/bankEndPoint.const";

export const bankCheckUtil = (accountId: string): BankEndPoint => {

  if (accountId.length < 3) {

    throw new ForbiddenException('잘못된 계좌번호입니다');
  }

  switch (accountId.slice(0, 3)) {
    case AccountConst.JB:
      return BankEndPoint.JB;
    case AccountConst.HY:
      return BankEndPoint.HY;
    case AccountConst.JM:
      return BankEndPoint.JM;
    case AccountConst.MG:
      return BankEndPoint.MG;
    default:
      throw new ForbiddenException('잘못된 계좌번호 입니다');
  }
}