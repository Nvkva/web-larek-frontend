import { Controller } from '@app/components/base/Controller';
import { IClickableEvent } from '@app/types/components/base/View';
import { AppState, AppStateModals } from '@app/types/components/model/AppState';
import { BasketProductData } from '@app/types/components/view/partial/BasketProduct';

export class BasketController extends Controller<AppState> {
	onRemove = (args: IClickableEvent<BasketProductData>) => {
		this.model.removeProductFormBasket(args.item.id);
	};
	onSubmit = () => {
		this.model.openModal(AppStateModals.contacts);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
