import { IClickable, IClickableEvent } from "../../base/View";

export interface BasketViewData {
  products: BasketProductData[];
}

export interface BasketViewSettings extends IClickable<BasketProductData> {
}

export interface BasketProductData {
  id: string;
  title: string;
  price: number | null;
  index: number;
}

export interface BasketProductSettings extends IClickable<BasketProductData> {
  index: string;
  title: string;
  price: string;
  deleteButton: string;
}
