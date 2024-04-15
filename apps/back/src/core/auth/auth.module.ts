import { Module } from '@nestjs/common';
import { AuthService } from 'src/core/auth/auth.service';
import { AuthController } from 'src/core/auth/auth.controller';
import { UserModule } from 'src/features/user/user.module';
import { JwtStrategy } from 'src/core/auth/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
