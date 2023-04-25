import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService : ProductService){}

    @Post()
    async addProduct(@Body() dto: ProductDto){
        return this.productService.add(dto);
    }
}
