import { View } from '../../base/View';
import { OrderData, OrderViewSettings, PayMethod } from '@app/types/components/view/partial/OrderData';

export class OrderInfoView extends View<OrderData, OrderViewSettings> {
  private currentPayMethod: PayMethod = 'card';
  private cashButton: HTMLElement;
  private cardButton: HTMLElement;
  private submitButton: HTMLElement;

  init() {
    this.submitButton = this.ensure(this.settings.submitButton);
    this.submitButton.addEventListener('click', this.settings.onSubmit.bind(this));

    this.element.addEventListener('submit', this.settings.onSubmit.bind(this));
    this.element.addEventListener('change', this.onChangeHandler.bind(this));


    this.cashButton = this.ensure(this.settings.cashButton);
    this.cashButton.addEventListener(
      'click',
      this.changeSelectedPaymentMethod.bind(this),
    );

    this.cardButton = this.ensure(this.settings.cardButton);
    this.cardButton.addEventListener(
      'click',
      this.changeSelectedPaymentMethod.bind(this),
    );

    this.cardButton.classList.add('button_alt-active');
  }

  onChangeHandler(event: SubmitEvent) {
    event.preventDefault();
    this.settings.onChange({ event, value: this.data });
    (this.submitButton as HTMLButtonElement).disabled = !Boolean(this.data.address.length);
    return false;
  }

  onClickHandler(event: MouseEvent) {
		this.settings.onSubmit({event});
	}

  private changeSelectedPaymentMethod(element: PointerEvent) {
    if ((element.target as HTMLButtonElement).name === 'cash') {
      this.selectedPayMethod = 'cash';
      this.cashButton.classList.add('button_alt-active');
      this.cardButton.classList.remove('button_alt-active');
    } else if ((element.target as HTMLButtonElement).name === 'card') {
      this.selectedPayMethod = 'card';
      this.cashButton.classList.remove('button_alt-active');
      this.cardButton.classList.add('button_alt-active');
    }
    this.settings.onChange({ value: this.data });
  }

  set address(value: string) {
    this.setValue<HTMLInputElement>(this.settings.address, {
      value,
    });
  }

  set selectedPayMethod(value: PayMethod) {
    this.currentPayMethod = value;
  }

  get data() {
    return {
      address: this.ensure<HTMLInputElement>(this.settings.address).value,
      selectedPayMethod: this.currentPayMethod,
    };
  }
}
