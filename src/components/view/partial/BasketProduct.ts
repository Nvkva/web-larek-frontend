import { View } from "@app/components/base/View";
import { BasketProductData, BasketProductSettings } from "@app/types/components/view/partial/BasketProduct";
import { SETTINGS } from "@app/utils/constants";

export class BasketProductView extends View<BasketProductData, BasketProductSettings> {
	protected _item!: BasketProductData;

	init() {
		this.ensure(this.settings.deleteButton).addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event, item: this._item });
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
	}

	set price(value: number | null) {
		this.setValue(this.settings.price, value ? `${String(value)} синапсов` : SETTINGS.pricelessTotalLabel);
	}

	set index(value: number) {
		this.setValue(this.settings.index, String(value));
	}

	render(data: BasketProductData) {
		this._item = data;
		return super.render(data);
	}
}