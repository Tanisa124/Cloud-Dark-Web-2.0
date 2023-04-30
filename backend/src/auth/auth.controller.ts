import { BadRequestException, Body, Controller, Get, Post, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateRequestDto } from './dto/authenticate.requests.dto';
import { RegisterRequestDto } from './dto/register.request.dto';
import { ConfirmRequestDto } from './dto/confirm.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerRequest: RegisterRequestDto) {
    try {
      return await this.authService.register(registerRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Post('confirm')
  async confirm(
    @Body() confirmUser: ConfirmRequestDto,
  ) {
    try {
      return await this.authService.confirmUser(confirmUser);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Post('authenticate')
  async authenticate(@Body() authenticateRequest: AuthenticateRequestDto) {
    try {
      return await this.authService.authenticate(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':username')
  async getByUsername(@Param('username') username: string){
    return await this.authService.findUserByUsername(username)
  }
}
