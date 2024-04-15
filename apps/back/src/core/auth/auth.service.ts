import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/features/user/user.service';
import { AuthCompleteSignUpDto, AuthLoginDto } from 'src/core/auth/auth.dto';
import {
  AccessToken,
  RefreshToken,
  Tokens,
} from 'src/shared/lib/interfaces/auth';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/features/user/user.entity';
import environment from 'environments/environment';
import { User } from 'src/shared/lib/interfaces/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(authDto: AuthLoginDto): Promise<Tokens> {
    const user = await this.userService.findByEmailWithHidden(authDto.email);
    if (!user) throw new ForbiddenException('Invalid credential A');
    const isMatch = await bcrypt.compare(authDto.password, user.password);
    if (!isMatch) throw new ForbiddenException('Invalid credential B');
    const refreshToken = await this.refreshToken(user);
    const accessToken = await this.creationAccessToken(user);
    await this.userService.setRefreshToken(user.id, refreshToken.refreshToken);
    await this.userService.updateLastLogin(user.id);
    return {
      accessToken: accessToken.accessToken,
      refreshToken: refreshToken.refreshToken,
    };
  }

  public async partialSignUp(authDto: AuthLoginDto): Promise<Tokens> {
    const user = await this.userService.findByEmailWithHidden(authDto.email);
    if (user) throw new ForbiddenException('Email already exists');
    const newUser = await this.userService.partialSignUp(authDto);
    const refreshToken = await this.refreshToken(newUser);
    const accessToken = await this.creationAccessToken(newUser);
    await this.userService.setRefreshToken(
      newUser.id,
      refreshToken.refreshToken,
    );
    await this.userService.updateLastLogin(newUser.id);
    return {
      accessToken: accessToken.accessToken,
      refreshToken: refreshToken.refreshToken,
    };
  }

  public async completeSignUp(
    user: User,
    authDto: AuthCompleteSignUpDto,
  ): Promise<UserEntity> {
    return this.userService.update(user.id, authDto);
  }

  public async creationAccessToken(user: UserEntity): Promise<AccessToken> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken: string = await this.jwtService.signAsync(payload, {
      secret: environment.accessTokenSecret,
      expiresIn: environment.accessTokenExpiresIn,
    });

    return { accessToken };
  }

  public async renewAccessToken(refreshToken: string): Promise<AccessToken> {
    const user = await this.verifyRefreshToken(refreshToken);
    return this.creationAccessToken(user);
  }

  public async verifyRefreshToken(refreshToken: string): Promise<UserEntity> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: environment.refreshTokenSecret,
      });
      const user = await this.userService.get(payload.sub);
      if (!user) throw new ForbiddenException('Invalid credential');
      return user;
    } catch (e) {
      throw new ForbiddenException('Invalid credential');
    }
  }

  public async refreshToken(user: UserEntity): Promise<RefreshToken> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const refreshToken: string = await this.jwtService.signAsync(payload, {
      secret: environment.refreshTokenSecret,
      expiresIn: environment.refreshTokenExpiresIn,
    });

    return { refreshToken };
  }
}
