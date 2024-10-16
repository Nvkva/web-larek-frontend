import { CardData, CardSettings } from '@app/types/components/view/partial/Card';
import { View } from '../../base/View';
import { SETTINGS } from '@app/utils/constants';


/**
 * Маленькая карточка фильма для списка
 */
export class CardView extends View<CardData, CardSettings> {
	id: string;

	init() {
		this.element.addEventListener('click', this.onClickHandler.bind(this));
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event, item: this.id });
	}

	set image(value: string) {
		this.setValue<HTMLImageElement>(this.settings.image, {
			src: value,
		});
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
		this.setValue<HTMLImageElement>(this.settings.image, {
			alt: value,
		});
	}

	set price(value: number | null) {
		this.setValue(this.settings.price, value ? `${String(value)} синапсов` : SETTINGS.nullPriceLabel);
	}
}
