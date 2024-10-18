import { View } from '../../base/View';
import { OrderData, OrderViewSettings, PayMethod } from '@app/types/components/view/partial/OrderData';

export class OrderInfoView extends View<OrderData, OrderViewSettings> {
  private currentPayMethod: PayMethod;

  init() {
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
		this.element.addEventListener('change', this.onSubmitHandler.bind(this));

    this.ensure(this.settings.cashButton).addEventListener(
			'click',
			this.changeSelectedPaymentMethod.bind(this),
		);

    this.ensure(this.settings.cardButton).addEventListener(
			'click',
			this.changeSelectedPaymentMethod.bind(this),
		);
	}

	onSubmitHandler(event: SubmitEvent) {
		event.preventDefault();
		this.settings.onChange({ event, value: this.data });
		return false;
	}

  private changeSelectedPaymentMethod(this: HTMLElement, ev: MouseEvent) {
    
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
