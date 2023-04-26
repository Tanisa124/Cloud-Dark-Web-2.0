import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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

    @Get(':id')
    async getById(@Param('id') id:string){
        return await this.productService.findById(id);
    }
    
    @Get('search')
    async getProductByKeyword(@Query('keyword') keyword:string){
        return await this.productService.findByKeyword(keyword);
    }
}
