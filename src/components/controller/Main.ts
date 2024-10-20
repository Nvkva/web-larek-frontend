import { AppState, AppStateModals } from "@app/types/components/model/AppState";
import { Controller } from "../base/Controller";
import { IClickableEvent } from "@app/types/components/base/View";

export class MainController extends Controller<AppState> {
	onOpenBasket = () => {
		this.model.openModal(AppStateModals.basket);
	};

	onOpenProduct = async (args: IClickableEvent<string>) => {
		const product = await this.api.getProduct(args.item);
		this.model.selectProduct(product);
		this.model.openModal(AppStateModals.productView);
	};
}
