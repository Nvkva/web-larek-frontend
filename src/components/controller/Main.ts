import { AppState, AppStateModals } from "@app/types/components/model/AppState";
import { Controller } from "../base/Controller";

export class MainController extends Controller<AppState> {
	onOpenBasket = () => {
		this.model.openModal(AppStateModals.basket);
	};

	// onSelectProduct = (id: string) => {
	// 	this.model.selectProduct(id);
	// };

	onOpenProduct = async (id: string) => {
		await this.model.loadProductItem(id);
		this.model.openModal(AppStateModals.productView);
	};
}
