import { IProduct } from './IProduct.interface';

export interface IDealerProduct {
  id: number;
  product_key: string;
  price: number;
  product_url: string;
  product_name: string;
  date: string;
  dealer_id: number;
  mapped?: null | IProduct;
}
