import { UserDto } from "src/auth/dto/user.dto";
import { IProduct } from "../utils/product.interface";

export class OrderDto{
    user: UserDto;
    products: IProduct[];
    createdAt: Date;
}