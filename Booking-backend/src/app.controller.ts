import { Controller, Get, Req, Res } from '@nestjs/common';
import { join } from 'path';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  // @Get('*')
  // getApp(@Req() req: Request, @Res() res: Response) {
  //   if (req.path.startsWith('/auth') || req.path.startsWith('/admin') || req.path.startsWith('/static'))   {
  //     res.status(404).json({ message: 'Not Found' });
  //   } else {
  //     res.sendFile(join(__dirname, '..', 'build', 'index.html'));
  //   }
  // }

  @Get('')
  getStaticFiles(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'build', 'static', res.req.url));
  }

}
