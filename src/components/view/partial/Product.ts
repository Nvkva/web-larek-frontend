import { ProductData, ProductViewSettings } from '@app/types/components/view/partial/ProductData';
import { View } from '../../base/View';

export class ProductView extends View<ProductData, ProductViewSettings> {

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

	set price(value: string) {
		this.setValue(this.settings.price, String(value));
	}
}
