import { IClickable } from "../../base/View";

export interface BasketViewData {
  products: BasketProductData[];
}

export interface BasketProductData {
  id: string;
  title: string;
  price: number;
  index: number;
}

export interface BasketProductSettings extends IClickable<BasketProductData> {
  index: string;
  title: string;
  price: string;
  deleteButton: string;
}