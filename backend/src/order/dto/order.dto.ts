import { UserDto } from "src/auth/dto/user.dto";
import { IProduct } from "../utils/product.interface";

export interface OrderDto{
    user: UserDto,
    products: IProduct[],
    createdAt: Date,
}