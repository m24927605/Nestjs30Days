import { Controller, Post, HttpStatus, HttpCode, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('getToken')
    @HttpCode(HttpStatus.OK)
    public async getToken( @Body() ID: number) {
        return await this.authService.createToken(ID);
    }
}