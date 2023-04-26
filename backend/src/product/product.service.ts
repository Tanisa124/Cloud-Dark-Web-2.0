import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { ProductDto } from './product.dto';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel : Model<Product>){}

    async add(dto : ProductDto){
        const createdProduct = new this.productModel(dto);
        return await createdProduct.save();
    }

    async findAll(){
        return await this.productModel.find();
    }

    async findByKeyword(keyword: string){
        const searchDbResult = await this.productModel.find(
            {
                title: {$regex : '.*' + keyword + '.*'}
        });

        if(searchDbResult.length == 0){
            return [await this.generateSearchResult(keyword)];
        }else{
            return searchDbResult;
        }
    }

    async findById(id : string){
        return await this.productModel.findById(id);
    }

    async generateSearchResult(keyword: string) : Promise<Product>{
        const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": "แต่งรายละเอียดของ" + keyword}],
            temperature: 0.8
        });

        const description = completion.data.choices[0].message.content;

        const searchData = JSON.stringify({
            "q": keyword,
            "gl": "th",
            "hl": "th",
            "autocorrect": false
          });
          
        const searchConfig = {
            method: 'post',
            url: 'https://google.serper.dev/images',
            headers: { 
              'X-API-KEY': process.env.GOOGLE_SEARCH_API_KEY, 
              'Content-Type': 'application/json'
            },
            data : searchData
          };
        
        const imageSearch = await axios(searchConfig);
        const imageURL = imageSearch.data.images[0].imageUrl;
        const price = Math.random() * 300;
        return this.add({
            title: keyword,
            description: description,
            price : parseFloat(price.toFixed(3)),
            imageURL: imageURL
        });
    }
}
