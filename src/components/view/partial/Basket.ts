import { View } from '../../base/View';
import { ListView } from '../common/List';
import { BasketProductData, BasketViewData, BasketViewSettings } from '@app/types/components/view/partial/BasketProduct';
import { SETTINGS } from '@app/utils/constants';

export class BasketView extends View<BasketViewData, BasketViewSettings> {
  private submitButton: HTMLElement;


  constructor(element: HTMLElement, settings: BasketViewSettings, private innerView: ListView<BasketProductData>) {
    super(element, settings);
  }

  init(): void {
    this.submitButton = this.ensure(SETTINGS.basketModal.submitButton)
    this.submitButton.addEventListener(
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

  set isDisabled(value: boolean) {
    (this.submitButton as HTMLButtonElement).disabled = value;
  }
}
