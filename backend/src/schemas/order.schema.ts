import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order{
    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    imageURL: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);