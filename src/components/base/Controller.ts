import { IProductAPI } from "@app/types/components/model/ProductApi";

export class Controller<T> {
	constructor(
		protected model: T,
		protected api?: IProductAPI,
	) { }
}
