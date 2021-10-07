import { Controller, Get, Render } from '@nestjs/common';

@Controller('/')
export class PageController {

  constructor(

  ) { }

  @Get('/error')
  @Render('error')
  errorPage() { }

  @Get('/remittance')
  @Render('remittance')
  remittancePage() { }

  @Get('/index')
  @Render('index')
  indexPage() { }
}