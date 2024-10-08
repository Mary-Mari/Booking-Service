
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AdminController {
  @Get('dashboard')
  getAdminDashboard(@Res() res: Response) {
    
  }
}
