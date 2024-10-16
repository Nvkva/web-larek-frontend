import { SETTINGS } from "@app/utils/constants";

export type ApiListResponse<Type> = {
  total: number;
  items: Type[];
};

export type Category = 'софт-скил' | 'хард-скил' | 'другое' | 'дополнительное' | 'кнопка';
export const categorySelectorClassMap = new Map<string, string>([
  ['софт-скил', SETTINGS.categoryClasses.soft],
  ['хард-скил', SETTINGS.categoryClasses.hard],
  ['другое', SETTINGS.categoryClasses.other],
  ['дополнительное', SETTINGS.categoryClasses.additional],
  ['кнопка', SETTINGS.categoryClasses.button],
])

export interface Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: Category;
  price: number | null;
}

export interface Order {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface OrderResult {
  id: string;
  total: number;
}

export interface IProductAPI {
  getProducts: () => Promise<Product[]>;
  getProduct: (id: string) => Promise<Product>;
  postOrder: (order: Order) => Promise<OrderResult>;
}