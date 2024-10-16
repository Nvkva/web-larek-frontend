import { ModalScreen } from "./ModalScreen";
import { SETTINGS } from "@app/utils/constants";
import { cloneTemplate } from "@app/utils/utils";
import { BasketData, BasketSettings } from "@app/types/components/view/screen/Basket";
import { BasketProductData, BasketViewData } from "@app/types/components/view/partial/BasketProduct";
import { BasketView } from "../partial/Basket";


export class BasketViewScreen extends ModalScreen<
  BasketViewData,
  BasketData,
  BasketSettings
> {
  initContent() {
    return new BasketView(cloneTemplate(SETTINGS.basketTemplate), {
      ...SETTINGS.basketModal,
      ...this.settings,
    });
  }

  set products(products: BasketProductData[]) {
    this.modal.content = {
      products: products,
    };
    this.submitButton.disabled = !products.length;
  }

  set total(total: string) {
    this.setValue(SETTINGS.basketModal.total, total === SETTINGS.nullPriceLabel ? total : `${total} cинапсов`)
  }
}
