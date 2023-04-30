import { User } from "next-auth";
import { IProduct } from "./Product";

export interface OrderRequest {
  user: OrderUser;
  products: IProduct[];
  createdAt: Date;
}

export interface OrderResponse {
  message: string;
}

export interface OrderUser {
  username: string;
}
