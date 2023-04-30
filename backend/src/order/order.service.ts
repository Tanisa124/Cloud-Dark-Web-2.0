import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Order } from 'src/schemas/order.schema';
import { IProduct } from './utils/product.interface';
import { OrderDto } from './dto/order.dto';


@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @Inject(AuthService) private readonly authService: AuthService,
    ){}
    
    SuccessOrderMSG(new_balance: number){
        return {
            statusCode: 200,
            message: 'Order placed successfully',
            balance: new_balance,
          };
        }

    async addOrderHistory(dto: OrderDto){
        const createOrderHist = new this.orderModel(dto);
        return await createOrderHist.save()
    }

    async OrderRequest(user: string, products: IProduct[], createdAt: Date){
        const searchDbResult = await this.authService.findUserByUsername(user)        
        let total_expense: number;
        total_expense = 0
        const js_products = JSON.parse(JSON.stringify(products))
        for (const item of js_products){
            if (item['price']){
                total_expense = (item['price'] + total_expense)
            } else{
                console.log('fail to access price in item')
            }
        }
        console.log('here')
        const balance_before_purchased = searchDbResult.balance
        const new_balance = (balance_before_purchased - total_expense)
        try {
            const createOrderHistDto = new OrderDto();
            createOrderHistDto.username = user;
            createOrderHistDto.products = products
            createOrderHistDto.createdAt = new Date(createdAt)
            console.log('here2')
            this.addOrderHistory(createOrderHistDto);
            console.log('here3')
            await this.authService.updateUserByUsername(user, new_balance)
            return this.SuccessOrderMSG(new_balance)
        } catch(error){
            throw new BadRequestException('Fail to Order')
        }
    }
}
