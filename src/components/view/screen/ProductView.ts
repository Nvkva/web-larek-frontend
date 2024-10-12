import { ModalScreen } from "./ModalScreen";
import { ProductData } from "@app/types/components/view/partial/ProductData";
import { IView } from "@app/types/components/base/View";
import { ProductViewData, ProductViewScreenSettings } from "@app/types/components/view/screen/ProductViewData";
import { SETTINGS } from "@app/utils/constants";
import { cloneTemplate } from "@app/utils/utils";
import { ProductView } from "../partial/Product";

export class ProductViewScreen extends ModalScreen<
	ProductData,
	ProductViewData,
	ProductViewScreenSettings
> {
	initContent(): IView<ProductData> {
		return new ProductView(cloneTemplate(SETTINGS.productViewElement), {
			...SETTINGS.productViewSettings,
			onClick: this.settings.onSubmit,
		});
	}

	set product(data: ProductData) {
		this.modal.content = data;
	}
}
