import { ProductData } from "../partial/ProductData";
import { ModalScreenData, ModalScreenSettings } from "./ModalScreen";

export interface BasketData extends ModalScreenData {
	products: ProductData[];
	total: string;
}

export interface BasketSettings extends ModalScreenSettings {
	onRemove: (id: string) => void;
}
