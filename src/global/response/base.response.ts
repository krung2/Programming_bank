export default class BaseResponse {

  constructor(
    public status: number,
    public message: string,
    public data?: string | object,
  ) { }
}