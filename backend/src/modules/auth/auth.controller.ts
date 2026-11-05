import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { AuthService, LoginResponse } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email?: string; password?: string }): Promise<LoginResponse> {
    return this.authService.login(body);
  }

  // Used after Google OAuth: AuthGuard validates token + admin allowlist.
  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: { user: { id: string; email?: string } }) {
    return { id: req.user.id, email: req.user.email ?? '' };
  }
}
