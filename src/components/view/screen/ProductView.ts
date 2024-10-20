import { ModalScreen } from "./ModalScreen";
import { ProductData } from "@app/types/components/view/partial/ProductData";
import { IView } from "@app/types/components/base/View";
import { ProductViewData, ProductViewScreenSettings } from "@app/types/components/view/screen/ProductViewData";
import { ProductView } from "../partial/Product";

export class ProductViewScreen extends ModalScreen<
	ProductData,
	ProductViewData,
	ProductViewScreenSettings
> {
	constructor(settings: ProductViewScreenSettings, private productViewComponent: ProductView) {
		super(settings);
	}

	initContent(): IView<ProductData> {
		return this.productViewComponent;
	}

	set product(data: ProductData) {
		this.modal.content = data;
	}
}
