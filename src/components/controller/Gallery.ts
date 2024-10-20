import { AppState, AppStateModals } from "@app/types/components/model/AppState";
import { Controller } from "../base/Controller";
import { IClickableEvent } from "@app/types/components/base/View";

export class GalleryController extends Controller<AppState> {
	onOpenProduct = async (args: IClickableEvent<string>) => {
		const product = await this.api.getProduct(args.item);
		this.model.selectProduct(product);
		this.model.openModal(AppStateModals.productView);
	};
}