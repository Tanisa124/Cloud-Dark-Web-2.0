import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]), AuthModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
