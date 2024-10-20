import { AppState, AppStateModals } from "@app/types/components/model/AppState";
import { Controller } from "../base/Controller";

export class PageController extends Controller<AppState> {
	onOpenBasket = () => {
		this.model.openModal(AppStateModals.basket);
	};
}