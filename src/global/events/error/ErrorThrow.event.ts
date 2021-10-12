export class ErrorThrowEvent {
  constructor(
    public sendIp: string,
    public sendUrl: string,
    public status: number,
    public message: string,
  ) { }
}