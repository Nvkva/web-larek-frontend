import { View } from '../../base/View';
import { ListView } from '../common/List';
import { BasketProductData, BasketViewData, BasketViewSettings } from '@app/types/components/view/partial/BasketProduct';
import { SETTINGS } from '@app/utils/constants';

export class BasketView extends View<BasketViewData, BasketViewSettings> {

  constructor(element: HTMLElement, settings: BasketViewSettings, private innerView: ListView<BasketProductData>) {
    super(element, settings);
  }

  init(): void {
    this.ensure(SETTINGS.basketModal.submitButton).addEventListener(
			'click',
			this.onClickHandler.bind(this),
		);
  }

  onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event });
	}

  set products(products: BasketProductData[]) {
    this.setElement(
      SETTINGS.basketCardsContainerSelector,
      this.innerView.render({ items: products }),
    )
  }
}
