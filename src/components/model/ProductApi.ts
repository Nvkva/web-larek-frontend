import { ApiListResponse, IProductAPI, Order, OrderResult, Product } from "@app/types/components/model/ProductApi";
import { Api } from "../base/api";

export class ProductAPI extends Api implements IProductAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	async getProduct(id: string): Promise<Product> {
		const data = await this._get<Product>(
			`/product/${id}`
		);
		return { ...data, image: this.cdn + data.image };
	}

	async getProducts(): Promise<Product[]> {
		const data = await this._get<ApiListResponse<Product>>('/product');
		return data.items.map((item) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	async postOrder(order: Order): Promise<OrderResult> {
		const data = await this._post<OrderResult>(
			'/order',
			order
		);
		return data;
	}
}
