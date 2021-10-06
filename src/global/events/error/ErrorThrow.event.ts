export class ErrorThrowEvent {
  constructor(
    public sendIp: string,
    public status: number,
    public message: string,
  ) { }
}