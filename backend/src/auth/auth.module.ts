import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/schemas/users.schema';


@Module({
  imports: [ConfigModule, MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
