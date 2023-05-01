export interface OrderRequest {
  username: string;
  products: OrderProduct[];
  createdAt: Date;
}

export interface OrderProduct {
  title: string;
  price: number;
  imageURL: string;
  amount: number;
  _id: string;
}

export interface OrderResponse {
  message: string;
}

export interface OrderUser {
  username: string;
}
