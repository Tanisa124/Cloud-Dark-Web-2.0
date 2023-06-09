import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DB_URI), ProductModule, AuthModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
