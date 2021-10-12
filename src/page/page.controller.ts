import { Controller, Get, Render } from '@nestjs/common';

@Controller('/')
export class PageController {

  constructor() { }

  @Get()
  @Render('index')
  indexPage() { }
}