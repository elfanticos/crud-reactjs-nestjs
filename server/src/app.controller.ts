import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  register(@Req() req: Request, @Res() res: Response): any {
    const {body} = req;
    res.status(201).send({mesagge: 'Se Registro'});
  }
}
