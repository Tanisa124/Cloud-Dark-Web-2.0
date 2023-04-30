import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Order } from 'src/schemas/order.schema';
import { IProduct } from './utils/product.interface';
import { OrderDto } from './dto/order.dto';
import { EmailPayload } from './dto/emailPayload.dto';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';
import Mail = require('nodemailer/lib/mailer');

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

    async SendEmail(username: string, products: IProduct[], email: string){
        const fromEmailAddress = process.env.FROM_EMAIL;
        const smtpHost = process.env.STMP_HOST ?? '';
        const smtpPort = parseInt(process.env.STMP_PORT ?? '587', 10);
        const smtpUser = process.env.STMP_USER ?? '';
        const smtpPassword = process.env.STMP_PASSWORD ?? '';

        const smtpTransport: Mail = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            auth: {
              user: smtpUser,
              pass: smtpPassword,
            },
          });

        const templateData: EmailPayload = {
            email,
            username,
            items: products,
        };
        const templatePath = path.join(__dirname, './utils/success-order.html');
        try {
            const source = fs.readFileSync(templatePath, { encoding: 'utf-8' });
            const template: HandlebarsTemplateDelegate<EmailPayload> = handlebars.compile(source);
            const html: string = template(templateData);
            
            const updatedData: Mail.Options = {
                to: email,
                html,
                from: `Dark Web 2.0 <${fromEmailAddress}>`,
                subject: 'Order Success!!!',
            };
            
            smtpTransport.sendMail(updatedData).then((result: nodemailer.SentMessageInfo): void => {
                console.info(result);
            });
        } catch (err) {
            console.error(err);
        }
        
        return 'Send email succesfully';}
        

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
            const balance_before_purchased = searchDbResult.balance
            const email = searchDbResult.email
            const new_balance = (balance_before_purchased - total_expense)
            try {
                const createOrderHistDto = new OrderDto();
                createOrderHistDto.username = user;
                createOrderHistDto.products = products
                createOrderHistDto.createdAt = new Date(createdAt)
                this.addOrderHistory(createOrderHistDto);
                await this.authService.updateUserByUsername(user, new_balance)
                await this.SendEmail(user, products, email)
                return this.SuccessOrderMSG(new_balance)
            } catch(error){
                throw new BadRequestException('Fail to Order')
            }
        }

}

