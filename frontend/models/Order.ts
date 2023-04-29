export interface OrderRequest {
  user: User;
  products: IProduct[];
  createdAt: Date;
}

export interface OrderResponse {
  message: string;
}
