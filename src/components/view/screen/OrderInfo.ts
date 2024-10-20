import { ModalScreen } from "./ModalScreen";
import { IChangeableEvent, IView } from "@app/types/components/base/View";
import { OrderScreenData, OrderScreenSettings } from "@app/types/components/view/screen/OrderData";
import { OrderInfoView } from "../partial/Order";
import { OrderData } from "@app/types/components/view/partial/OrderData";

export class OrderInfoScreen extends ModalScreen<
	OrderData,
	OrderScreenData,
	OrderScreenSettings
> {
  constructor(settings: OrderScreenSettings, private orderView: OrderInfoView) {
    super(settings);
  }

	initContent(): IView<OrderData> {
		return this.orderView;
	}

	protected onFormChange({ value }: IChangeableEvent<OrderData>) {
		this.settings.onChange(value);
	}

  set data(data: OrderData) {
    this.modal.content = data;
  }
}
