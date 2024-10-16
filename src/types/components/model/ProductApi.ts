export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export interface Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
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