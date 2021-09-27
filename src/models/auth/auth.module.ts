import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User, UserSchema } from 'src/schemas/user.schema';
import { IngredientsService } from '../ingredients/ingredients.service';
import { HashService } from 'src/common/services/hash/hash.service';
import { LocalStrategy } from 'src/common/strategies/local.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  }),
],
  providers: [AuthService, UserService, HashService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}