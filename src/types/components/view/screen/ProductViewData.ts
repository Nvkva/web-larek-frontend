import { ProductData } from "../partial/ProductData";
import { ModalScreenData, ModalScreenSettings } from "./ModalScreen";

export interface ProductViewData extends ModalScreenData {
  product: ProductData,
}

export interface ProductViewScreenSettings extends ModalScreenSettings<ProductData> {
}