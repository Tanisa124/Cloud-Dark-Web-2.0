import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService : ProductService){}

    @Post()
    async addProduct(@Body() dto: ProductDto){
        return  await this.productService.add(dto);
    }

    @Get()
    async getAllProduct(){
        return await this.productService.findAll();
    }

    @Get('search')
    async getProductByKeyword(@Query('keyword') keyword:string){
        return await this.productService.findByKeyword(keyword);
    }
}
