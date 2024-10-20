import { ModalScreen } from "./ModalScreen";
import { SETTINGS } from "@app/utils/constants";
import { cloneTemplate } from "@app/utils/utils";
import { BasketData, BasketSettings } from "@app/types/components/view/screen/Basket";
import { BasketProductData, BasketProductSettings, BasketViewData } from "@app/types/components/view/partial/BasketProduct";
import { BasketView } from "../partial/Basket";


export class BasketViewScreen extends ModalScreen<
  BasketViewData,
  BasketData,
  BasketSettings
> {
  initContent() {
    return this.basketView;
  }

  constructor(settings: BasketSettings, private basketView: BasketView) {
    super(settings);
  }

  set products(products: BasketProductData[]) {
    this.modal.content = {
      products: products,
    };
  }

  set total(total: string) {
    this.setValue(SETTINGS.basketModal.total, total === SETTINGS.pricelessTotalLabel ? total : `${total} cинапсов`)
  }
}
