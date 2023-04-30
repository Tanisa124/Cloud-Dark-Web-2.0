import { IProduct } from "../utils/product.interface";

export class OrderDto{
    username: string;
    products: IProduct[];
    createdAt: Date;
}