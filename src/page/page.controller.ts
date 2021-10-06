import { Controller, Get, Render } from '@nestjs/common';

@Controller('/')
export class PageController {

  constructor(

  ) { }

  @Get('/error')
  @Render('error')
  root() { }
}