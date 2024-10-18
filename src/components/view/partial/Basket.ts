import { View } from '../../base/View';
import { ListView } from '../common/List';
import { BasketProductData, BasketViewData } from '@app/types/components/view/partial/BasketProduct';
import { cloneTemplate, ensureElement } from '@app/utils/utils';
import { SETTINGS } from '@app/utils/constants';
import { BasketProductView } from './BasketProduct';
import { BasketSettings } from '@app/types/components/view/screen/Basket';

export class BasketView extends View<BasketViewData, BasketSettings> {
  private innerView: ListView<BasketProductData>;

  init(): void {
    this.innerView = new ListView<BasketProductData>(ensureElement(SETTINGS.basketCardsContainerSelector), {
      ...SETTINGS.basketModal,
      item: new BasketProductView(cloneTemplate(SETTINGS.basketElementTemplate), {
        ...SETTINGS.basketElementSettings,
        onClick: this.settings.onRemove,
      }),
    });

    this.ensure(SETTINGS.basketModal.submitButton).addEventListener(
			'click',
			this.onClickHandler.bind(this),
		);
  }

  onClickHandler(event: MouseEvent) {
		this.settings.onSubmit({ event });
	}

  set products(products: BasketProductData[]) {
    this.setElement(
      SETTINGS.basketCardsContainerSelector,
      this.innerView.render({ items: products }),
    )
  }
}
