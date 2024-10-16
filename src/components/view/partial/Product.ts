import { ProductData, ProductViewSettings } from '@app/types/components/view/partial/ProductData';
import { View } from '../../base/View';
import { SETTINGS } from '@app/utils/constants';

export class ProductView extends View<ProductData, ProductViewSettings> {
	init(): void {
		this.ensure(this.settings.submitButton).addEventListener(
			'click',
			this.onClickHandler.bind(this),
		);
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event });
	}

	set image(value: string) {
		this.setValue(this.settings.image, value);
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
	}

  set description(value: string) {
		this.setValue(this.settings.description, value);
	}

	set category(value: string) {
		this.setValue(this.settings.category, value);
	}

	set price(value: string | null) {
		this.setValue(this.settings.price, String(value ?? SETTINGS.nullPriceLabel));
	}
}
