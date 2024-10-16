import { ProductData, ProductViewSettings } from '@app/types/components/view/partial/ProductData';
import { View } from '../../base/View';
import { SETTINGS } from '@app/utils/constants';
import { categorySelectorClassMap } from '@app/types/components/model/ProductApi';

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
		this.setValue<HTMLImageElement>(this.settings.image, {
			src: value,
		});
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
	}

	set description(value: string) {
		this.setValue(this.settings.description, value);
	}

	set category(value: string) {
		this.setValue(this.settings.category, value);
		this.setValue(this.settings.category, {
			classList: categorySelectorClassMap.get(value) ?
				`${SETTINGS.categoryClasses.base} ${categorySelectorClassMap.get(value)}` : ''
		})
	}

	set price(value: string | null) {
		this.setValue(this.settings.price, String(value ?? SETTINGS.nullPriceLabel));
	}
}
