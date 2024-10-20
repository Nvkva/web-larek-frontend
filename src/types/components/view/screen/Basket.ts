import { IClickableEvent } from "../../base/View";
import { BasketProductData } from "../partial/BasketProduct";
import { ModalScreenData, ModalScreenSettings } from "./ModalScreen";

export interface BasketData extends ModalScreenData {
	products: BasketProductData[];
	total: string;
}

export interface BasketSettings extends ModalScreenSettings<BasketData> {
	onRemove: (args: IClickableEvent<BasketProductData>) => void;
}
