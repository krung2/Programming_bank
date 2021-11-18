export enum BankEndPoint {
  JB = 'http://localhost:8080/remittance/receive',
  HY = 'http://34.64.79.162:8080/transfer/get',
  GJB = 'http://localhost:8080/account/find/id/',
  GHY = 'http://34.64.79.162:8080/account/account/',
}

export enum BankAccountEndPoint {
  JB = 'http://localhost:8080/account/find/phone/',
  HY = 'http://34.64.79.162:8080/account/get/',
}