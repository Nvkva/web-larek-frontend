import { AppState, AppStateModals } from "@app/types/components/model/AppState";
import { Controller } from "../base/Controller";

export class MainController extends Controller<AppState> {
	onOpenBasket = () => {
		this.model.openModal(AppStateModals.basket);
	};

	onOpenProduct = async (id: string) => {
		const product = await this.api.getProduct(id);
		this.model.selectProduct(product);
		this.model.openModal(AppStateModals.productView);
	};
}
