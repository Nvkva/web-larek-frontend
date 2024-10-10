import { AppState, AppStateModals } from "@app/types/components/model/AppState";
import { Controller } from "../base/Controller";

export class ProductViewController extends Controller<AppState> {
	onSubmit = () => {
		// this.model.openModal(AppStateModals.place);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
