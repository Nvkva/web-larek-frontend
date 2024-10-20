import { AppState, AppStateModals } from "@app/types/components/model/AppState";
import { Controller } from "../base/Controller";
import { IClickableEvent } from "@app/types/components/base/View";

export class MainController extends Controller<AppState> {
	onOpenBasket = () => {
		console.log('asd');
		
		this.model.openModal(AppStateModals.basket);
	};

	onOpenProduct = async (args: IClickableEvent<string>) => {
		console.log('args :>> ', args);
		const product = await this.api.getProduct(args.item);
		this.model.selectProduct(product);
		this.model.openModal(AppStateModals.productView);
	};
}
