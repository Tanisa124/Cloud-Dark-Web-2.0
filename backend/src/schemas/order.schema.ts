import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDto } from 'src/auth/dto/user.dto';
import { IProduct } from 'src/order/utils/product.interface';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  user: UserDto;

  @Prop({ type: [{ title: String, price: Number, imageURL: String }], required: true })
  products: IProduct[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
