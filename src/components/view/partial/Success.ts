import { SETTINGS } from '@app/utils/constants';
import { View } from '../../base/View';
import { SuccessData, SuccessViewSettings } from '@app/types/components/view/partial/Success';

export class SuccessView extends View<SuccessData, SuccessViewSettings> {
  init() {
    this.ensure(this.settings.submitButton).addEventListener(
      'click',
      this.onClickHandler.bind(this)
    );
  }

  onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event });
	}

  set totalDescription(value: string) {
    if (value !== SETTINGS.nullPriceLabel) {
      this.setValue(this.settings.description, `Списано ${value} синапсов`);
    } else {
      this.setValue(this.settings.description, 'Ваша корзина оказалась бесценной!');
    }
  }
}
