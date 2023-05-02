import { IProduct } from '../utils/product.interface';

export interface EmailPayload {
  email: string;
  username: string;
  items: IProduct[];
  total_expense: number;
  new_balance: string;
}
