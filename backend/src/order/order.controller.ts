import { Controller, Body, Post, BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('request')
    async request(@Body() orderRequest: OrderDto) {
        try {
            const user = orderRequest.user
            const products = orderRequest.products
            const createdAt = orderRequest.createdAt
            return await this.orderService.OrderRequest(user, products, createdAt);
        } catch (e){
            throw new BadRequestException(e.message)
        }
    }
}
