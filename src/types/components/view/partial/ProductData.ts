import { IClickable } from "../../base/View";
import { Product } from "../../model/ProductApi";

export interface ProductData {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface ProductViewSettings extends IClickable<Product> {
  image: string;
  title: string;
  description: string;
  category: string;
  price: string;
  submitButton: string;
}