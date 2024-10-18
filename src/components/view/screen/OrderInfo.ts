import { ModalScreen } from "./ModalScreen";
import { IChangeableEvent, IView } from "@app/types/components/base/View";
import { SETTINGS } from "@app/utils/constants";
import { cloneTemplate } from "@app/utils/utils";
import { OrderScreenData, OrderScreenSettings } from "@app/types/components/view/screen/OrderData";
import { OrderInfoView } from "../partial/Order";
import { OrderData } from "@app/types/components/view/partial/OrderData";

export class OrderInfoScreen extends ModalScreen<
	OrderData,
	OrderScreenData,
	OrderScreenSettings
> {
	initContent(): IView<OrderData> {
		return new OrderInfoView(cloneTemplate(SETTINGS.orderTemplate), {
			...SETTINGS.orderSettings,
			onChange: this.onFormChange.bind(this),
		});
	}

	protected onFormChange({ value }: IChangeableEvent<OrderData>) {
		this.settings.onChange(value);
	}

  set data(data: OrderData) {
    this.modal.content = data;
  }
}
