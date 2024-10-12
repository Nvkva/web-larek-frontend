import { AppState, AppStateModals } from "@app/types/components/model/AppState";
import { Controller } from "../base/Controller";
import { Product } from "@app/types/components/model/ProductApi";

export class ProductViewController extends Controller<AppState> {
	onSubmit = () => {
		this.model.addProductInBasket();
		this.model.openModal(AppStateModals.none);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
