import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from 'src/core/auth/auth.service';
import {
  AuthCompleteSignUpDto,
  AuthLoginDto,
  AuthRefreshTokenDto,
  AuthSignUpDto,
} from 'src/core/auth/auth.dto';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/shared/lib/decorators/public.decoratos';
import { User } from 'src/shared/lib/interfaces/user';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    description: 'Login credentials',
    type: AuthLoginDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The user access token',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
        },
        refreshToken: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Login', description: 'Login' })
  @Public()
  login(@Body() authDto: AuthLoginDto) {
    return this.authService.login(authDto);
  }

  @Post('signup')
  @ApiBody({
    description: 'Sign up credentials',
    type: AuthSignUpDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The user access token',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
        },
        refreshToken: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Partial sign up', description: 'Partial sign up' })
  @Public()
  signUp(@Body() authDto: AuthSignUpDto) {
    return this.authService.partialSignUp(authDto);
  }

  @ApiBody({
    description: 'Complete sign up credentials',
    type: AuthCompleteSignUpDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Complete sign up',
  })
  @ApiOperation({
    summary: 'Complete sign up',
    description: 'Complete sign up',
  })
  @Post('signup/complete')
  completeSignUp(@Req() req: Request, @Body() authDto: AuthCompleteSignUpDto) {
    return this.authService.completeSignUp(req.user as User, authDto);
  }

  @Post('refreshtoken')
  @ApiBody({
    description: 'Refresh token',
    type: AuthRefreshTokenDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The user access token',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Renew access token',
    description: 'Renew access token',
  })
  @Public()
  renew(@Body() refreshToken: AuthRefreshTokenDto) {
    return this.authService.renewAccessToken(refreshToken.refreshToken);
  }

  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get current user',
    description: 'Get current user',
  })
  me(@Req() req: Request) {
    return req.user;
  }
}
