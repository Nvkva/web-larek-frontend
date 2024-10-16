import { IClickableEvent } from "../../base/View";
import { BasketProductData } from "../partial/BasketProduct";
import { ProductData } from "../partial/ProductData";
import { ModalScreenData, ModalScreenSettings } from "./ModalScreen";

export interface BasketData extends ModalScreenData {
	products: BasketProductData[];
	total: string;
}

export interface BasketSettings extends ModalScreenSettings {
	onRemove: (args: IClickableEvent<BasketProductData>) => void;
}
