import { IProduct } from './IProduct.interface';
import { IDealer } from './IDealer.interface';

export interface IDealerProduct {
  id: number;
  product_key: string;
  price: number;
  product_url: string;
  product_name: string;
  date: string;
  dealer: IDealer;
  mapped?: null | IProduct;
}
